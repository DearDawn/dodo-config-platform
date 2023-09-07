import { useStore } from '@/utils/common/useStore';
import React from 'react';

export const useModalStore = () => {
  const [modalStore, setModalStore] = useStore({
    modalList: [] as React.ReactNode[],
    hasModal: false,
    hasModal2: false,
    change: () => {
      setModalStore({ hasModal2: true });
    },
    addList: () => {
      setModalStore({ modalList: [1, 2, 3] });
    },
    showModal: (child: React.ReactElement | string | number) => {
      setModalStore({
        modalList: (list) => [...list, child],
      });
    },
  });

  modalStore.hasModal = !!modalStore.modalList.length;
  modalStore.hasModal2 = modalStore.hasModal;

  return { modalStore };
};
