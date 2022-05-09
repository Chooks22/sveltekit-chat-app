FROM node:18.1.0-alpine3.15 as build

WORKDIR /build

# install step
COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock ./
RUN yarn install

# prisma step
COPY prisma prisma
RUN yarn prisma generate

# build step
COPY . .
RUN yarn build

# clean step
RUN yarn workspaces focus -A --production

FROM node:18.1.0-alpine3.15

WORKDIR /app

COPY --from=build /build/node_modules node_modules
COPY --from=build /build/dist /build/package.json ./

CMD [ "node", "." ]
