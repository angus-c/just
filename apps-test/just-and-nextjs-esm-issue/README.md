## Context

Repo created to reproduce an issue with [just](https://anguscroll.com/just/) packages: https://github.com/angus-c/just/issues/332

## Reproduce

1. Clone https://github.com/rqbazan/just-and-nextjs-esm-issue
2. Install all dependencies with `yarn`
3. Run the build process: `yarn build` ❌
4. Profit!

```bash
./node_modules/just-map-values/index.esm.js
Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (22:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| }
|
> export { objectMapValues as default };
|
```
