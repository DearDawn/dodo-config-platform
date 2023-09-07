import { getHistoryContent } from '@/utils/api/config';
import type { NextApiRequest, NextApiResponse } from 'next';

export type HistoryRes = {
  content: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HistoryRes>
) => {
  const { name: _name, version = '0' } = req.query;
  const name = String(_name || '');

  const { content = '' } =
    (await getHistoryContent(name, Number(version))) || {};

  res.status(200).json({ content: JSON.stringify(content) });
};

export default handler;
