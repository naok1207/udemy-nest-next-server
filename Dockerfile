FROM oven/bun

ADD . .
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install
RUN bun run build

CMD bun run start:prod
