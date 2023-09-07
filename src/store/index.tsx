import { createContext, useContext } from 'react';
import { RootStore, useAppStore } from './app';

const AppContext = createContext<RootStore>({} as never);

export function AppWrapper({ children }: { children: any }) {
  const rootStore = useAppStore();
  console.log('[dodo] ', '0', 0);

  return (
    <AppContext.Provider value={rootStore}>{children}</AppContext.Provider>
  );
}

console.log('[dodo] ', '1111', 1111);

export function useRootStore() {
  return useContext(AppContext);
}
