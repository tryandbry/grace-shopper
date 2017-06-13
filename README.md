# Rocks

## Init


```sh
npm install
npm run dev
```

The `dev` script sets `NODE_ENV` to "development", runs the build script in watch mode, and
starts the server with `nodemon`. Build vs server logs are separated by a prefix. If you prefer
to run the server and build processes separately, you can instead do:

```sh
npm run start-dev
```

```sh
npm run build-dev
```

in two separate terminals. The vanilla `npm start` is for production.

## Layout
### Directory

`/app` has the React/Redux setup. `main.jsx` is the entry point.

`/db` has the Sequelize models and database setup.

`/server` has the Express server and routes. `start.js` is the entry point.

`/bin` has scripts. (Two scripts for heroku deploy, one script that creates a useful symlink.)

### React Flow
![/route , Component](/public/assets/img/reactflow.jpg)


## Quick Heroku deployment

1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and install [Yarn](https://yarnpkg.com/en/) if you haven't already (`npm install -g yarn`)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add postgres
    3. `npm run deploy-heroku`. This will create a new branch and compile and commit your frontend JS to it, then push that branch to Heroku.
    4. `heroku run npm run seed` to seed the database

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

Afterwards,
  - *To deploy:* `npm run deploy-heroku`
  - *To re-seed:* `heroku run npm run seed`