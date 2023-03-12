---
"just-diff": major
---

optimize diff path: trim from left and right (recursviely) and use shortest path, replace at root level if values are of different type. Addresses https://github.com/angus-c/just/issues/505
