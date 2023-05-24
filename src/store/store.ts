import { create } from "zustand";

type Store = {
    status: boolean,
    updateStatus: () => void,
}

export const useIsUserLogged = create<Store>((set) => ({
    status: false,
    updateStatus: () => set((state) => ({status: !state.status}))
}))