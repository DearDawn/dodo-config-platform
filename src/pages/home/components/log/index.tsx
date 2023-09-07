import React from 'react';
import styles from './index.module.css';
import { T_ITEM_INIT_CONFIG } from '@/types/api';
import clsx from 'clsx';
import { Tag } from '@/components/tag';

interface IProps {
  info?: T_ITEM_INIT_CONFIG;
}

export const Log = (props: IProps) => {
  const { info } = props;

  if (!info) return null;

  return (
    <div className={styles.logList}>
      {info?.log.map((it, index) => {
        const isCurrent = it.version === info.version_current;
        const isLatest = it.version === info.version_latest;
        const itemClass = clsx(styles.logItem, {
          [styles.current]: isCurrent,
          [styles.latest]: isLatest,
        });

        return (
          <div className={itemClass} key={`${it.date}-${index}`}>
            <div className={styles.versionLine}>
              <span>{it.date}</span>
            </div>
            <div className={styles.line}>
              <span>{it.operator}</span>&nbsp;
              <span>{it.option} 至</span>&nbsp;
              <span>v{it.version}</span>
              {isCurrent && (
                <Tag bgColor='#b7eb8f' className={styles.tag}>
                  当前版本
                </Tag>
              )}
              {isLatest && (
                <Tag bgColor='#c38feb' className={styles.tag}>
                  最新版本
                </Tag>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
