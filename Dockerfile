FROM denoland/deno:2.1.1

EXPOSE 8000

WORKDIR /app

USER deno

# Cache the dependencies
COPY deno.lock .
RUN deno install

# Copy working directory
COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno install --entrypoint server.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-run", "server.ts"]