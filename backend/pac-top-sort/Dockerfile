FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .

ENV PORT 80
ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 80
