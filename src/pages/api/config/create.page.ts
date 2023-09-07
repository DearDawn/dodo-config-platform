import { DATA_DIR, FS_CONFIG } from '@/constant/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import jsonfile from 'jsonfile';
import { getLogContent, registerConfig } from '@/utils/api/config';
import { T_ITEM_INIT_CONFIG } from '@/types/api';
import { LOG_OPTION } from '@/types/enum';

export type CreateRes = {
  name: string;
  content: string;
  body: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateRes>
) => {
  const body = JSON.parse(req.body);
  const { name = '', content: _content = '' } = body;
  const content = _content || JSON.stringify(body);
  const v0File = path.join(DATA_DIR, `${name}_0.json`);
  const config: T_ITEM_INIT_CONFIG = {
    name,
    version_current: 0,
    version_latest: 0,
    desc: '配置文件',
    log: [],
  };
  config.log.push(getLogContent(config, LOG_OPTION.create));

  registerConfig(config, LOG_OPTION.create);

  jsonfile.writeFileSync(v0File, JSON.parse(content), FS_CONFIG);

  res.status(200).json({ name, content, body });
};

export default handler;
