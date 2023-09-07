import { getConfigByName, removeConfig } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type DeleteRes = {
  name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteRes>
) => {
  const body = JSON.parse(req.body);
  const { name = '' } = body;
  const oldConfig = await getConfigByName(name);

  if (oldConfig) {
    oldConfig.version_latest += 1;
    oldConfig.version_current += 1;
    removeConfig(oldConfig);
  }

  res.status(200).json({ name });
};

export default handler;
