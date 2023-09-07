import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

interface IProps {
  className?: string;
  children: React.ReactNode;
  bdColor?: string;
  bgColor: string;
}

export const Tag = (props: IProps) => {
  const { className, children, bdColor, bgColor } = props;

  const rootClass = clsx(styles.tag, className);

  return (
    <div
      style={{ borderColor: bdColor, backgroundColor: bgColor }}
      className={rootClass}
    >
      {children}
    </div>
  );
};
