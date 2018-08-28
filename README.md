# Appy - SSO

> Last updated : **28 / 08 / 2018** by Sacha B.

The portal allowing access to **Appy Pack** applications as well as administration. This is a web application made with [**Vue.js**](https://vuejs.org/).

This application uses an linter to have the ability to produce a clean and understandable code by a developer team ☝🏼.
The project also follows the [guidelines](https://vuejs.org/v2/style-guide/) 📜 described by Vue.js.

## 🔥 Vue CLI 3

This project uses the new and beautiful [**Vue CLI 3**](https://cli.vuejs.org/).
This service provides a complete project management, you can learn more on the official [documentation](https://cli.vuejs.org/guide/) 🔍.

## 🔧 Installation

Follow the instructions on this page of the official guide to install Vue CLI 3.

To start the project manager with graphical user interface, type the following command in your terminal:

> The dollar sign **$** represents the terminal prompt.

``` bash
$ vue ui
```

When the project manager is launched you can then import the Appy project.

## 🚀 Development

### Requirements

You must enter the API development URL in the _./env.**development**_ file at the *VUE_APP_API_URL* attribute.

### Run task

Go to the **Tasks** section on the project manager, select the **serve** task and click _Run Task_. 👍🏻

## 📦 Build for production

### Requirements

You must enter the API development URL in the _./env.**production**_ file at the *VUE_APP_API_URL* attribute.

### Run task

Go to the **Tasks** section on the project manager, select the **build** task and click _Run Task_. 👍🏻

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

## Plugins (most relevant, not exhaustive)
- HTTP requests : [vue-cli-plugin-axios](https://www.npmjs.com/package/vue-cli-plugin-axios)
- UI Framework : [vue-cli-plugin-element](https://www.npmjs.com/package/vue-cli-plugin-element)
- Internationalization : [vue-cli-plugin-i18n](https://www.npmjs.com/package/vue-cli-plugin-i18n)

## Dependencies (most relevant, not exhaustive)
- [bluebird](https://www.npmjs.com/package/bluebird)
- [detect-browser](https://www.npmjs.com/package/detect-browser)
- [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)
- [moment](https://www.npmjs.com/package/moment)
- [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill)
- [vue-mq](https://www.npmjs.com/package/vue-mq)
- [vuex-pathify](https://www.npmjs.com/package/vuex-pathify)
- [vuex-persist](https://www.npmjs.com/package/vuex-persist)


## Authors
- [Sacha Bejaud](sacha.bejaud@digi-smart.fr)