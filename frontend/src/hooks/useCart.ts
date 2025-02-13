import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { addItem, removeItem, clearCart } from "../stores/slices/cartSlice";
import type { CartItem } from "../stores/slices/cartSlice";
import { RootState } from "../stores/store";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector(
    (state: RootState) => state.cart || { items: [], totalAmount: 0 }
  );

  const handleAddItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      dispatch(addItem({ ...item, quantity: 1 } as CartItem));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      dispatch(removeItem(itemId));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    totalAmount,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
  };
};
