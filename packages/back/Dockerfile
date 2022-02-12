# Builder
FROM node:16-alpine as builder
ENV NODE_ENV=production
RUN apk add --no-cache bash git openssh curl openssl
COPY . /srv/app
WORKDIR /srv/app
RUN NODE_ENV=development yarn && yarn bootstrap && \
    yarn workspace back build && yarn clean && \
    yarn workspaces focus back --production && \
    sh docker/optimize-back.sh

# App
FROM node:16-alpine as app
ENV NODE_ENV=production
WORKDIR /srv/app
COPY --from=builder /srv/app .
CMD yarn workspace back start