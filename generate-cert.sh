#!/bin/bash

set -e

# 防止 Git Bash 把 /C=CN 当成路径转换
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

TYPE="${TYPE:-ECC}"
ISSUENAME="${ISSUENAME:-nobody}"

cat > san.cnf <<EOF
extendedKeyUsage=serverAuth
subjectAltName=DNS:music.163.com,DNS:*.music.163.com
EOF

if [ "$TYPE" = "RSA" ]; then

    echo "[1/4] Generating Root CA..."

    openssl genrsa -out ca.key 2048

    openssl req \
        -x509 \
        -new \
        -nodes \
        -key ca.key \
        -sha256 \
        -days 1825 \
        -out ca.crt \
        -subj "//C=CN/CN=UnblockNeteaseMusic Root CA/O=$ISSUENAME"

    echo "[2/4] Generating Server Key..."

    openssl genrsa -out server.key 2048

    echo "[3/4] Generating CSR..."

    openssl req \
        -new \
        -sha256 \
        -key server.key \
        -out server.csr \
        -subj "//C=CN/L=Hangzhou/O=NetEase (Hangzhou) Network Co., Ltd/OU=IT Dept./CN=*.music.163.com"

    echo "[4/4] Signing Server Certificate..."

    openssl x509 \
        -req \
        -in server.csr \
        -CA ca.crt \
        -CAkey ca.key \
        -CAcreateserial \
        -out server.crt \
        -days 3650 \
        -sha256 \
        -extfile san.cnf

else

    echo "[1/4] Generating Root CA..."

    openssl ecparam \
        -genkey \
        -name secp384r1 \
        -out ca.key

    openssl req \
        -x509 \
        -new \
        -nodes \
        -key ca.key \
        -sha384 \
        -days 1825 \
        -out ca.crt \
        -subj "//C=CN/CN=UnblockNeteaseMusic Root CA/O=$ISSUENAME"

    echo "[2/4] Generating Server Key..."

    openssl ecparam \
        -genkey \
        -name secp384r1 \
        -out server.key

    echo "[3/4] Generating CSR..."

    openssl req \
        -new \
        -sha384 \
        -key server.key \
        -out server.csr \
        -subj "//C=CN/L=Hangzhou/O=NetEase (Hangzhou) Network Co., Ltd/OU=IT Dept./CN=*.music.163.com"

    echo "[4/4] Signing Server Certificate..."

    openssl x509 \
        -req \
        -in server.csr \
        -CA ca.crt \
        -CAkey ca.key \
        -CAcreateserial \
        -out server.crt \
        -days 3650 \
        -sha384 \
        -extfile san.cnf

fi

rm -f san.cnf

echo
echo "======================================"
echo "Certificate generation completed!"
echo "======================================"
echo
echo "Generated files:"
echo "  ca.crt"
echo "  ca.key"
echo "  server.crt"
echo "  server.key"
echo