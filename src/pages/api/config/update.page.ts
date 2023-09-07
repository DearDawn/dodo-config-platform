import { DATA_DIR, FS_CONFIG } from '@/constant/api';
import jsonfile from 'jsonfile';
import { T_ITEM_INIT_CONFIG } from '@/types/api';
import { getConfigByName, registerConfig } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { LOG_OPTION } from '@/types/enum';

export type UpdateRes = {
  name: string;
  content: string;
  body: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UpdateRes>
) => {
  const body = JSON.parse(req.body);
  const { name = '', content = '' } = body;
  const oldConfig = await getConfigByName(name);

  if (oldConfig) {
    const version = (oldConfig.version_latest || 0) + 1;
    const config: T_ITEM_INIT_CONFIG = {
      ...oldConfig,
      version_current: version,
      version_latest: version,
    };
    const vNextFile = path.join(DATA_DIR, `${name}_${version}.json`);

    await jsonfile.writeFileSync(vNextFile, JSON.parse(content), FS_CONFIG);
    registerConfig(config, LOG_OPTION.update);
  }

  res.status(200).json({ name, content, body });
};

export default handler;
