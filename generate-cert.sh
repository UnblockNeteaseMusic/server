#!/bin/bash

case "$OSTYPE" in
    msys*|cygwin*)
        export MSYS_NO_PATHCONV=1
        export MSYS2_ARG_CONV_EXCL="*"
        ;;
esac

TYPE="${TYPE:-RSA}"
ISSUENAME="${ISSUENAME:-nobody}"

cat > san.cnf <<EOF
extendedKeyUsage=serverAuth
subjectAltName=DNS:music.163.com,DNS:*.music.163.com
EOF

if [ "$TYPE" == "RSA" ]; then
	openssl genrsa -out ca.key 2048
	openssl req -x509 -new -nodes -key ca.key -sha256 -days 1825 -out ca.crt -subj "/C=CN/CN=UnblockNeteaseMusic Root CA/O=$ISSUENAME"
	openssl genrsa -out server.key 2048
	openssl req -new -sha256 -key server.key -out server.csr -subj "/C=CN/L=Hangzhou/O=NetEase (Hangzhou) Network Co., Ltd/OU=IT Dept./CN=*.music.163.com"
	openssl x509 -req -extfile san.cnf -sha256 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
elif [ "$TYPE" == "ECC" ]; then
	openssl ecparam -genkey -name secp384r1 -out ca.key
	openssl req -x509 -new -nodes -key ca.key -sha384 -days 1825 -out ca.crt -subj "/C=CN/CN=UnblockNeteaseMusic Root CA/O=$ISSUENAME"
	openssl ecparam -genkey -name secp384r1 -out server.key
	openssl req -new -sha384 -key server.key -out server.csr -subj "/C=CN/L=Hangzhou/O=NetEase (Hangzhou) Network Co., Ltd/OU=IT Dept./CN=*.music.163.com"
	openssl x509 -req -extfile san.cnf -sha384 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
fi

rm -f san.cnf