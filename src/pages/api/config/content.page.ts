import { T_ITEM_INIT_CONFIG } from '@/types/api';
import { getContentByName } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ContentRes = {
  content: string;
} & T_ITEM_INIT_CONFIG;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ContentRes>
) => {
  const { name: _name } = req.query;
  const name = String(_name || '');

  const { content, configInfo } = (await getContentByName(name)) || {};

  if (content && configInfo) {
    const { log, ...keyConfig } = configInfo;
    res.status(200).json({
      content: JSON.stringify(content),
      ...keyConfig,
      log: log.reverse().slice(0, 10),
    });
  } else {
    res.status(200).json({ content: JSON.stringify(content) } as any);
  }
};

export default handler;
