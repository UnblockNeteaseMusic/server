---
default: major
---

# Replace the root CA

The root CA `ca.crt` and the default certificate `server.crt` and `server.key` are new, because the key of the old root CA was lost. The root CA is valid until 2031-11-24 and the default certificate until 2027-11-25.

Install the new `ca.crt` in the system and in the client of Netease Cloud Music, and remove the old root CA. The old root CA no longer signs any certificate.
