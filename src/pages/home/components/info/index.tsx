import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { T_ITEM_INIT_CONFIG, T_ITEM_VERSION_CONFIG } from '@/types/api';
import { API } from '@/api/config';
import { Button } from '@/components/button';
import clsx from 'clsx';
import { Tag } from '@/components/tag';

interface IProps {
  info?: T_ITEM_INIT_CONFIG;
  onRollback: (version: number) => void;
}

export const Info = (props: IProps) => {
  const { info, onRollback } = props;
  const [versionList, setVersionList] = useState<T_ITEM_VERSION_CONFIG[]>([]);

  const handleRollback = (version = 0) => {
    return () => {
      onRollback(version);
    };
  };

  const handlePreview = (version = 0) => {
    return async () => {
      const res = await API.fetchHistory({ name: info!.name, version });
      console.log('[dodo] ', 'res', res);
    };
  };

  const getVersionList = useCallback(async (name = '') => {
    if (!name) {
      setVersionList([]);
      return;
    }
    const res = await API.version({ name });
    setVersionList(res.list || []);
  }, []);

  useEffect(() => {
    getVersionList(info?.name);
  }, [getVersionList, info?.name, info?.version_current]);

  if (!info) return null;

  return (
    <div className={styles.infoDetail}>
      <div className={styles.infoBlock}>
        <div>名称：{info?.name}</div>
        <div>描述：{info?.desc}</div>
        <div>当前版本：{info?.version_current}</div>
        <div>最新版本：{info?.version_latest}</div>
      </div>
      <div className={styles.title}>版本记录</div>
      <div className={styles.versionList}>
        {versionList.map((it, index) => {
          const isCurrent = it.version === info.version_current;
          const isLatest = it.version === info.version_latest;
          const itemClass = clsx(styles.versionItem, {
            [styles.current]: isCurrent,
            [styles.latest]: isLatest,
          });

          return (
            <div className={itemClass} key={`${it.date}-${index}`}>
              <div className={styles.versionLine}>
                v{it.version}
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
                <Button
                  size='small'
                  className={styles.previewBtn}
                  onClick={handlePreview(it.version)}
                >
                  预览
                </Button>
                {!isCurrent && (
                  <Button
                    size='small'
                    className={styles.rollbackBtn}
                    onClick={handleRollback(it.version)}
                  >
                    回滚
                  </Button>
                )}
              </div>
              <div className={styles.line}>日期：{it.date}</div>
              <div className={styles.line}>人员：{it.operator}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
