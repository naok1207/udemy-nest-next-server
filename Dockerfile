FROM oven/bun

# RUN apt update
# RUN apt install sudo

# RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
# RUN sudo apt-get install -y nodejs npm


ADD . .
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install
RUN bun install -g @nestjs/cli
RUN bun run nest build

CMD ["bun", "run", "nest", "start:prod"]
