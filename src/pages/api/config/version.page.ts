import { T_ITEM_LOG_CONFIG, T_ITEM_VERSION_CONFIG } from '@/types/api';
import { LOG_OPTION } from '@/types/enum';
import { getConfigByName } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type VersionRes = {
  list: T_ITEM_VERSION_CONFIG[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<VersionRes>
) => {
  const { name: _name } = req.query;
  const name = String(_name || '');

  const configInfo = await getConfigByName(name);
  const { log = [] } = configInfo || {};
  const versionList: T_ITEM_VERSION_CONFIG[] = log
    .filter((it) => it.option !== LOG_OPTION.rollback)
    .map((it) => ({
      date: it.date,
      operator: it.operator,
      version: it.version,
    }));

  res.status(200).json({ list: versionList.reverse() });
};

export default handler;
