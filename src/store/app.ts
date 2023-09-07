import { useModalStore } from './modal';

export const useAppStore = () => {
  const { modalStore } = useModalStore();

  return { modalStore };
};

export type RootStore = ReturnType<typeof useAppStore>;
