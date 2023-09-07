import React, { FC, useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

interface ITabProps {
  onClick: (tabId: string) => void;
  active: string;
  keyList: { label: string; key: string }[];
  children: React.JSX.Element[];
}

interface IBoxProps {
  children: React.ReactNode;
  className?: string;
  tabKey: string;
}

const Tab = (props: ITabProps) => {
  const { onClick, keyList, children, active } = props;
  const [activeKey, setActiveKey] = useState(active || '');

  const handleClick = (it: ITabProps['keyList'][0]) => () => {
    onClick(it.key);
    setActiveKey(it.key);
  };

  const getBox = () => {
    const BoxItem = children.find((it) => it.props.tabKey === activeKey);

    return BoxItem;
  };

  return (
    <div role='button' className={styles.tabs}>
      <div className={styles.tabList}>
        {keyList.map((it) => (
          <div
            className={clsx(styles.tabItem, {
              [styles.active]: it.key === activeKey,
            })}
            key={it.key}
            onClick={handleClick(it)}
          >
            {it.label}
          </div>
        ))}
      </div>
      {getBox()}
    </div>
  );
};

const Box: FC<IBoxProps> = (props) => {
  const { children, tabKey, className } = props;

  return <div className={clsx(styles.tabBox, className)}>{children}</div>;
};

export const Tabs = { Tab, Box };
