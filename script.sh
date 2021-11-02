#!/usr/bin/env bash

PROJECT=mailcheck.site
# PROJECT=just-and-nextjs-esm-issue
# PROJECT=node-app

LIB=just-map-values@latest

cd apps-test/$PROJECT
# npm install just-camel-case@5.1.4 --registry=http://0.0.0.0:4873
npm install $LIB --registry=http://0.0.0.0:4873

# npm run dev
# npm run start
npm run build


# 5.1.4 => functionando
