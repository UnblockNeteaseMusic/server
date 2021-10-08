FROM node:lts-alpine AS builder

COPY . /root/

RUN set -ex && cd /root \
&& yarn install && yarn build


FROM node:lts-alpine

RUN set -ex && mkdir /app

COPY --from=builder /root/precompiled/* /app/
COPY --from=builder /root/*.crt /app/
COPY --from=builder /root/*.key /app/

ENV SIGN_CERT /app/server.crt
ENV SIGN_KEY /app/server.key
ENV NODE_ENV production
ENV SOURCE bilibili kugou kuwo

WORKDIR /app

ENTRYPOINT ["node", "app.js", "-o", "${SOURCE}"]
