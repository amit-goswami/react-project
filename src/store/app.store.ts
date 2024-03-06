import { create } from "zustand";

type AppManagementStore = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profileName: string | null;
  selectedSectionIndex: number | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setProfileName: (profileName: string) => void;
  setSelectedSectionIndex: (selectedSectionIndex: number) => void;
};

const useAppStore = create<AppManagementStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  profileName: null,
  selectedSectionIndex: 0,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setProfileName: (profileName) => set({ profileName }),
  setSelectedSectionIndex: (selectedSectionIndex) =>
    set({ selectedSectionIndex }),
}));

export default useAppStore;
