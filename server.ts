const DAY_ROUTE = new URLPattern({ pathname: "/day/:day" });

async function handler(req: Request): Promise<Response> {
  const day = DAY_ROUTE.exec(req.url)?.pathname.groups.day;
  
  if (!day) {
    return new Response("Not found (try /day/1)", { status: 404 });
  }

  const command = new Deno.Command("deno", {
    args: ["run", "--allow-read=.", `./day${day}.ts`],
  });
  const { code, stdout, stderr } = await command.output();

  if (code != 0) {
    return new Response(new TextDecoder().decode(stderr), { status: 500 });
  }

  return new Response(new TextDecoder().decode(stdout), { status: 200 });
}

if (import.meta.main) {
  Deno.serve(handler);
}
