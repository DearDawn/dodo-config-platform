import { LOG_OPTION } from '@/types/enum';
import { getConfigByName, registerConfig } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type RollbackRes = {
  name: string;
  version: number;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RollbackRes>
) => {
  const body = JSON.parse(req.body);
  const { name = '', version = 0 } = body;
  const oldConfig = await getConfigByName(name);

  if (oldConfig) {
    oldConfig.version_current = version;
    registerConfig(oldConfig, LOG_OPTION.rollback);
  }

  res.status(200).json({ name, version });
};

export default handler;
