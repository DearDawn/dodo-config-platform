import React from 'react';
import styles from './index.module.css';
import { useRootStore } from '@/store';
import clsx from 'clsx';

interface IProps {}

export const ModalRoot = () => {
  const { modalStore } = useRootStore();
  const { modalList, hasModal } = modalStore || {};

  console.log('[dodo] ', 'modalList', modalList, hasModal);

  return (
    <div
      className={clsx(styles.modalRoot, {
        [styles.noModal]: !hasModal,
      })}
    >
      {modalList.map((it) => (
        <div key={it?.toString()} className={styles.modalItem}>
          {it}
        </div>
      ))}
    </div>
  );
};
