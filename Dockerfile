FROM node:lts-alpine

RUN set -ex && mkdir /app

COPY ./precompiled/* /app/
COPY ./*.crt /app/
COPY ./*.key /app/

ENV SIGN_CERT /app/server.crt
ENV SIGN_KEY /app/server.key
ENV NODE_ENV production

WORKDIR /app

EXPOSE 8080 8081

ENTRYPOINT ["node", "app.js"]
