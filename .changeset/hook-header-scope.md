---
default: patch
---

# Scope the header overrides and correct the fallback

The configured Netease headers apply only to hosts in the `music.163.com` domain. The radio fallback runs only when the request likes a track. A refused response stays unchanged until a provider returns a usable URL, and Web matching continues past an entry without an ID.
