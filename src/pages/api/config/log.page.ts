import { T_ITEM_LOG_CONFIG } from '@/types/api';
import { getConfigByName } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type LogRes = {
  list: T_ITEM_LOG_CONFIG[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<LogRes>) => {
  const { name: _name } = req.query;
  const name = String(_name || '');

  const configInfo = await getConfigByName(name);
  const { log = [] } = configInfo || {};

  res.status(200).json({ list: log.reverse() });
};

export default handler;
