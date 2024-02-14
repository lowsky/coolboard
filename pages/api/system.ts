import type { NextApiRequest, NextApiResponse } from 'next';
import packageInfo from '../../package.json';

type ResponseData = {
  message?: string;
  info?: Record<string, string>;
  error?: string;
};

function someAsyncOperation(): Record<string, string> {
  const { next, prisma, react, graphql } = packageInfo.dependencies;
  return {
    name: packageInfo.name,
    next,
    prisma,
    react,
    graphql,
  };
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const info = someAsyncOperation();
    res.status(200).json({ message: 'Generated at ' + new Date(), info });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
