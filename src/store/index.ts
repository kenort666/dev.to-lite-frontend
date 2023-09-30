import { create } from 'zustand';
import { IAuthResponse } from '../@types';

interface IUseAuthState {
  user: {};
  isAuth: boolean;
  authUser: () => void;
  saveUser: (data: IAuthResponse) => void;
  logoutUser: () => void;
}

export const useAuth = create<IUseAuthState>((set) => ({
  user: {},
  isAuth: false,
  authUser: () =>
    set((state) => ({
      isAuth: (state.isAuth = true),
    })),
  logoutUser: () =>
    set((state) => ({
      isAuth: (state.isAuth = false),
      user: (state.user = {}),
    })),
  saveUser: (data: IAuthResponse) =>
    set((state) => ({
      user: (state.user = data.user),
    })),
}));
