# appy-sso-webapp

> Application web du SSO de APPY

## Build Setup

``` bash
# install dependencies
npm install

# create the .env.js file by copying the .env.example.js file and verify the api url

# modify the host url in config/index.js file to the url you want to run the app

# verify the client_id and client_secret for the authentication of the api in src/api/auth.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
