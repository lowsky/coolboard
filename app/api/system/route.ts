import packageInfo from '../../../package.json';
import { NextResponse } from 'next/server';

export function GET(): NextResponse {
  try {
    const { next, prisma, react, graphql } = packageInfo.dependencies as Record<
      string,
      string
    >;
    const info = {
      name: packageInfo.name,
      next,
      prisma,
      react,
      graphql,
    };
    return NextResponse.json(
      {
        message: 'Generated at ' + new Date().toUTCString(),
        info,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'failed to load data' },
      {
        status: 500,
      }
    );
  }
}
