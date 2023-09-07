import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

interface IProps {
  className?: string;
  children: React.ReactNode;
  onClick?: VoidFunction;
  size?: 'normal' | 'small';
}

export const Button = (props: IProps) => {
  const { className, children, size = 'normal', onClick } = props;

  const rootClass = clsx(styles.button, styles[size], className);

  return (
    <button className={rootClass} onClick={onClick}>
      {children}
    </button>
  );
};
