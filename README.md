<img src="https://dev.azure.com/cskow/qa-library/_apis/build/status/skow0020.qa-library"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />

## QA Library website using the Mongo Express React Node stack

### Quick Start

* Install dependencies by running `npm install`.
* Install client  dependencies by running `npm install:client`.
* See the readme's in the associated directories for more info about each
* Add .env file with the following info: 
  
PORT=5001

NODE_ENV=<dev, production>

DB_USER=

DB_PASS=

* Run `npm build:client` to build the client app for serving
* Run `npm start` to start the mongo db connection and serve the app on localhost 5001
* 😎 **That's it!**
<br />

### Available Scripts

### `npm start`

Starts up the mongo db connection and serve the app on localhost 5001

### `npm run test:unit`

Runs unit tests on the models

### `npm run test:api`

Runs api tests. Be sure to set the .env to run on the dev environment

### `npm run lint:client`

Runs linting on the client project

### `npm run test:unit:client`

Runs unit tests on client components

### `npm run test:accessibility:client`

Runs accessibility tests on client components

### `npm run test:snapshot:client`

Runs snapshot tests on client components

### `npm run build:client`

Builds the client application for serving

<br />

### Built using

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Mocha](https://mochajs.org/)
- [Mongoose-sequence](https://github.com/ramiel/mongoose-sequence)
- [Chai](https://www.chaijs.com/)
- [Shards React](https://github.com/designrevision/shards-react)
- [Create-React-App](https://github.com/facebook/create-react-app)


<br />