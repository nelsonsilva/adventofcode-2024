import log from './log.ts';

const DAY_ROUTE = new URLPattern({ pathname: '/day/:day'});

async function handler(req: Request): Promise<Response> {
  const day = DAY_ROUTE.exec(req.url)?.pathname.groups.day
  if (!day) {
    return new Response('Not found (try /day/1)', { status: 404 });
  }
  try {
    const res = (await import(`./day${day}.ts`))?.default()
    return new Response([...log.messages, '\n', res].join('\n'), { status: 200 });
  } catch (error) {
    return new Response((error as Error).message , { status: 500 });
  }
}

if (import.meta.main) {
  Deno.serve(handler);
}

