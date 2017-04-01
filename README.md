# 1. INITIAL SETUP
- babel/eslint
- gulp setup
- initial template "hello world"
- app structure


# 2. ANGULAR JS INSTALL
- npm install --save angular angular-animate angular-ui-router
- create app.js
- create states.js
- controllers
- templates


# 3. SERVER API AND DATABASE SETUP
- setup Postgres database: npm install --save debug chalk sequelize pg pg-native
- npm install --save cheerio request
- using request and cheerio, fetch and update information directly from the federal interest website
- implement GET API to fetch rates stored in the Postgres database


# 4. ANGULAR FACTORIES
- RateFactory: fech rates using $http
- LoanFactory: calculate loan schedule and send back to controller


# 5. CREATE LOAN INPUT AND RESULT FORM
- using ui-view, create component form view inside the main view template
- create form.template.html and update <ui-view> inside main.template.html
- connect the form with MainCtrl
- styling form(browser/scss/form.scss)


# 6. OTHER TEMPLATES
- footer
- table
- background and parallax effect