import { ROOT_INIT_FILE, FS_CONFIG } from '@/constant/api';
import { initConfig } from '@/utils/api/config';
import jsonfile from 'jsonfile';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ListDataRes = {
  list: { name: string }[];
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListDataRes>
) => {
  try {
    console.log('[dodo] ', '78979', 78979);
    const configInfo = jsonfile.readFileSync(ROOT_INIT_FILE, FS_CONFIG);
    const list = configInfo.config_list;

    res.status(200).json({ list });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      initConfig(true);
      res.status(200).json({ list: [] });
    }
  }
};

export default handler;
