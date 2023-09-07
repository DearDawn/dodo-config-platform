import React, { useEffect } from 'react';
import { useRootStore } from '@/store';

interface IProps {
  className?: string;
  visible?: boolean;
  children: React.ReactElement | string | number;
  onClick?: VoidFunction;
  size?: 'normal' | 'small';
}

export const Modal = (props: IProps) => {
  const { className, visible, children, size = 'normal', onClick } = props;
  const { modalStore } = useRootStore();
  const { modalList, showModal } = modalStore || {};

  useEffect(() => {
    if (!visible) return;

    showModal(children);
  }, [visible, showModal, children]);

  return null;
};
