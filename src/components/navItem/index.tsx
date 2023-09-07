import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

interface IProps {
  onClick: (name: string) => void;
  name: string;
  active: boolean;
}

export const NavItem = (props: IProps) => {
  const { onClick, name, active } = props;

  const handleClick = () => {
    onClick(name);
  };

  const className = clsx(styles.navItem, {
    [styles.active]: active,
  });

  return (
    <div role='button' className={className} onClick={handleClick}>
      {name}
    </div>
  );
};
