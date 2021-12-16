FROM node:lts-alpine

RUN set -ex && mkdir /app
RUN apk add --no-cache python3 && ln -sf python3 /usr/bin/python
RUN wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp && chmod a+rx /usr/local/bin/yt-dlp
RUN wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl && chmod a+rx /usr/local/bin/youtube-dl

COPY ./precompiled/* /app/
COPY ./*.crt /app/
COPY ./*.key /app/

ENV SIGN_CERT /app/server.crt
ENV SIGN_KEY /app/server.key
ENV NODE_ENV production

WORKDIR /app

EXPOSE 8080 8081

ENTRYPOINT ["node", "app.js"]
