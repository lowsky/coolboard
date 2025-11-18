import packageInfo from '../../../package.json';

export function GET() {
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
    return Response.json({ message: 'Generated at ' + new Date(), info });
  } catch {
    return new Response(JSON.stringify({ error: 'failed to load data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
