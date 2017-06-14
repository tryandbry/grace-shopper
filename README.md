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

## Requirements

### Unauthenticated Users

#### View products (catalog)

- Refine listing by category
- Search product listing
- View a product's details
    - Product information
    - Photo(s)
    - View reviews left by authenticated users

#### Manage their cart
- Add an item to the cart from product listing or product detail pages
- Remove an item from the cart
- Edit/update quantities of items in the cart
- Log in and continue editing the cart
- Refresh the page without being logged in and have the cart persist (you may use sessionStorage, localStorage, Cookies or JWT for this)

#### Account Management
- Create an account
- Login with Facebook and/or Google
- Checkout

#### Purchase items from cart

- Specify shipping address and email address
- **Receive confirmation email**
- **Receive notification emails upon order shipping, then order delivery**

### Authenticated Users

#### Logout

#### Account management

- **View past order list**
- View order detail
    - Current order status
    - Items with quantity and subtotal
    - Link to the original product detail page
    - Date/time order was created

#### Product reviews

- Leave a review (with text and a 5-star rating) for a product

### Admin

#### **Product management**
- Create and edit products with name, description, price and one or more photos
- Create categories for items, each item can have multiple categories
- Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
- Add/remove categories from items
#### **Order management**
- View a list of all orders
- Filter orders by status (Created, Processing, Cancelled, Completed)
- Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
- View details of a specific order
#### **User management**
- Promote other user accounts to have admin status
- Delete a user
- Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)

## Data Validations
All completed.

### Application
#### Tests
#### Heroku deploy
#### **Continuous integration**
 
> Written with [StackEdit](https://stackedit.io/).

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