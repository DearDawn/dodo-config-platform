import { getContentByName } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ContentRes = {
  content: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ContentRes>
) => {
  const { name: _name } = req.query;
  const name = String(_name || '');

  const info = await getContentByName(name);
  const { content = {} } = info || {};
  res.status(200).json(content);
};

export default handler;
