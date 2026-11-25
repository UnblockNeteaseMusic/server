#!/usr/bin/env bash
# The default certificate (server.crt, server.key), signed by the root CA of ca.crt.
#
#   cert.sh due     exit 0 when server.crt ends within 60 days, 1 when it does not
#   cert.sh renew   sign a new server.crt and server.key with the CA key in $CA_KEY (PEM text),
#                   and write a change file
set -euo pipefail

cd "$(dirname "$0")/../.."
window=$((60 * 24 * 3600))

case "${1:-}" in
due)
	end=$(openssl x509 -noout -enddate -in server.crt)
	echo "server.crt: ${end#notAfter=}"
	if openssl x509 -noout -checkend "$window" -in server.crt >/dev/null; then
		exit 1
	fi
	;;
renew)
	: "${CA_KEY:?CA_KEY is empty}"
	work=$(mktemp -d)
	trap 'rm -rf "$work"' EXIT
	umask 077
	printf '%s\n' "$CA_KEY" >"$work/ca.key"

	# renew-cert.sh reads ca.crt, ca.key and writes server.* in the current directory.
	cp ca.crt renew-cert.sh "$work/"
	(cd "$work" && TYPE=ECC bash renew-cert.sh)
	umask 022
	cp "$work/server.crt" "$work/server.key" .

	# The new files must chain to ca.crt, match each other and last a year.
	openssl verify -CAfile ca.crt server.crt
	crt=$(openssl x509 -noout -pubkey -in server.crt)
	key=$(openssl pkey -pubout -in server.key)
	[ "$crt" = "$key" ] || {
		echo "server.key does not match server.crt" >&2
		exit 1
	}
	openssl x509 -noout -checkend $((300 * 24 * 3600)) -in server.crt

	ca_end=$(openssl x509 -noout -enddate -in ca.crt)
	crt_end=$(openssl x509 -noout -enddate -in server.crt)
	if ! openssl x509 -noout -checkend $((365 * 24 * 3600)) -in ca.crt >/dev/null; then
		echo "::warning::ca.crt ends (${ca_end#notAfter=}) before the new server.crt (${crt_end#notAfter=}). Clients must install a new CA."
	fi

	date=$(date -u +%Y-%m-%d)
	cat >".changeset/renew-certificate-${date}.md" <<MD
---
default: patch
---

# Renew the default certificate

The bundled \`server.crt\` and \`server.key\` are replaced; the new certificate is valid until ${crt_end#notAfter=}. The root CA \`ca.crt\` is unchanged.
MD
	;;
*)
	echo "usage: cert.sh due|renew" >&2
	exit 2
	;;
esac
