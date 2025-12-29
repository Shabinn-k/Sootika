import { createContext, useEffect, useState } from "react";
import { api } from "../api/Axios";
import { useAuth } from "../Authentication/AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  /* =====================
     FETCH CART / WISHLIST
  ===================== */
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setWishItems([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setCartItems(res.data.cart || []);
        setWishItems(res.data.wishlist || []);
      } catch {
        toast.error("Failed to load cart data");
      }
    };

    fetchData();
  }, [user?.id]);

  /* =====================
     UPDATE USER DATA
  ===================== */
  const updateUserData = async (payload) => {
    if (!user) return;
    try {
      await api.patch(`/users/${user.id}`, payload);
    } catch {
      toast.error("Failed to sync data");
    }
  };

  /* =====================
     CART
  ===================== */
  const addToCart = async (item) => {
    if (!user) {
      toast.warn("Please login to add items to cart!");
      return;
    }

    let updatedCart;

    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === item.id);

      if (exist) {
        updatedCart = prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        );
      } else {
        updatedCart = [...prev, { ...item, quantity: 1 }];
      }

      return updatedCart;
    });

    await updateUserData({ cart: updatedCart });
    toast.dismiss();
    toast.success("Cart updated");
  };

  const removeCart = async (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    await updateUserData({ cart: updated });
    toast.dismiss();
    toast.info("Item removed from cart");
  };

  const clearCart = async () => {
    setCartItems([]);
    await updateUserData({ cart: [] });
    toast.dismiss();
    toast.info("Cart cleared");
  };

  /* =====================
     WISHLIST
  ===================== */
  const addToWish = async (item) => {
    if (!user) {
      toast.warn("Please login to add items");
      return;
    }

    if (wishItems.some((w) => w.id === item.id)) {
      toast.info("Already in wishlist");
      return;
    }

    const updated = [...wishItems, item];
    setWishItems(updated);
    await updateUserData({ wishlist: updated });
    toast.dismiss();
    toast.success("Added to wishlist");
  };

  const removeWish = async (id) => {
    const updated = wishItems.filter((item) => item.id !== id);
    setWishItems(updated);
    await updateUserData({ wishlist: updated });
    toast.dismiss();
    toast.info("Removed from wishlist");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCart,
        clearCart,
        wishItems,
        addToWish,
        removeWish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
