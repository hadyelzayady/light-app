FROM oven/bun:1 as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /tmp/prod
COPY package.json bun.lockb /tmp/prod/
RUN cd /tmp/prod && bun install --frozen-lockfile

FROM  install AS prerelease
COPY --from=install /tmp/prod/node_modules node_modules
COPY . .

FROM base AS release
COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src ./src
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/vite.config.mjs .
COPY --from=prerelease /usr/src/app/postcss.config.js .
COPY --from=prerelease /usr/src/app/tailwind.config.js .
COPY --from=prerelease /usr/src/app/tsconfig.json .
COPY --from=prerelease /usr/src/app/index.html .

EXPOSE 3000/tcp
ENTRYPOINT ["bun", "dev"]
