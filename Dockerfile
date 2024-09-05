FROM node:lts-alpine

RUN set -ex && mkdir /app
RUN apk add --no-cache python3 youtube-dl \
    && wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

COPY ./precompiled/* /app/
COPY ./*.crt /app/
COPY ./*.key /app/

ENV SIGN_CERT /app/server.crt
ENV SIGN_KEY /app/server.key
ENV NODE_ENV production
ENV PORTS="80:443"
ENV CHINA_IP="103.126.92.133"

WORKDIR /app

EXPOSE 80 443

ENTRYPOINT ["sh", "-c", "node app.js -p $PORTS -f $CHINA_IP"]
