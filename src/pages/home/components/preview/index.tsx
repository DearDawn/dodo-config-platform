import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.css';
import { Button } from '@/components/button';
import { useRootStore } from '@/store';
import { Modal } from '@/components/modal';

interface IProps {
  configKey?: string;
}

export const Preview = (props: IProps) => {
  const { configKey } = props;
  const { modalStore } = useRootStore();
  const [previewContent, setPreviewContent] = useState('');
  const [visible, setVisible] = useState(false);

  const previewUrl = useMemo(() => {
    if (!configKey) return '';

    const prefix = 'http://localhost:3000';
    return `${prefix}/api/json/${configKey}`;
  }, [configKey]);

  const handlePreviewData = useCallback(() => {
    if (!previewUrl) return;

    fetch(previewUrl)
      .then((res) => res.json())
      .then((res) => {
        setPreviewContent(JSON.stringify(res, undefined, 2));
      });
  }, [previewUrl]);

  const handleFetch = useCallback(() => {
    setVisible(true);
    handlePreviewData();
  }, [handlePreviewData]);

  console.log('[dodo] ', 'modalStore', modalStore.hasModal);

  return (
    <div className={styles.infoDetail}>
      <a target='_blank' href={previewUrl} className={styles.url}>
        {previewUrl}
      </a>
      <Button className={styles.fetchBtn} onClick={handleFetch}>
        发起请求
      </Button>
      <div className={styles.preview}>{previewContent}</div>
      <Modal visible={visible}>98765432333</Modal>
    </div>
  );
};
