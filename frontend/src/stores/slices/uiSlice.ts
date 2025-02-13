import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
}

const initialState: UIState = {
  isCartOpen: false,
  isLoginModalOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    toggleLoginModal: (state) => {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const {
  toggleCart,
  toggleLoginModal,
  addNotification,
  removeNotification,
} = uiSlice.actions;
export default uiSlice.reducer; 