---
default: patch
---

# Handle the Bilibili API errors

The Bilibili provider rejects cleanly when the API omits a search result or blocks the request, and uses a backup audio URL when `base_url` is absent.
