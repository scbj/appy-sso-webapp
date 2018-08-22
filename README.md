# Appy - SSO

The portal allowing access to **Appy Pack** applications as well as administration. This is a web application made with [Vue.js](https://vuejs.org/).

This application uses an linter to have the ability to produce a clean and understandable code by a developer team ☝🏼.
The project also follows the [guidelines](https://vuejs.org/v2/style-guide/) 📜 described by Vue.js.

## 🚀 Development

### Requirements

You must enter the API development URL in the _./config/**dev**.env.js_ file at the *API_URL* attribute.

### Installation

``` bash
# Yarn
yarn && yarn dev

# Or with npm
npm install && npm run dev
```

## 📦 Build for production

### Requirements
- You must enter the API development URL in the _./config/**prod**.env.js_ file at the *API_URL* attribute.
- Remember to use the _./static_/ folder for assets that don't have to be processed by webpack.

### Build

``` bash
# Yarn
yarn && yarn build

# Or with npm
npm install && npm run build
```

### Installation
The command above will generate in the _./dist/_ folder all the files necessary for the web application. So you just have to put the **contents** of this folder at the **root of your website** and configure your HTTP server so that **each route** will return to the _index.html_ file.

#### Example with Appache
Create a _.htaccess_ file at the root of your website and write the content below.

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]
```

## Dependencies (most relevant, not exhaustive)
- [axios](https://www.npmjs.com/package/axios)
- [element-ui](https://www.npmjs.com/package/element-ui)
- [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)
- [moment](https://www.npmjs.com/package/moment)
- [vue-i18n](https://www.npmjs.com/package/vue-i18n)
- [vue-mq](https://www.npmjs.com/package/vue-mq)
- [vuex-pathify](https://www.npmjs.com/package/vuex-pathify)
- [vuex-persist](https://www.npmjs.com/package/vuex-persist)


## Authors
- [Thomas Dubois](thomas.dubois@digi-smart.fr)
- [Sacha Bejaud](sacha.bejaud@digi-smart.fr)