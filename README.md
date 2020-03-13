## address-book-fullstack

### How to run this project?

- Client Side

1. Run `npm i` in the project directory then run `npm start`.

- Server Side

1. `cd` into the server directory.
2. Run `npm i` .
3. Execute `docker-compose up db` to run docker container.
4. Run ``npm run migrate up``` to run db migrations.
5. Then run `nodemon index.js`.
6. If you encounter `Error: connect ECONNREFUSED 127.0.0.1:5432`, follow the steps below:
   Open the SQL Tabs program. You'll see an address bar at the top of the window in that bar type in the following address.

> postgres://postgres@localhost:5432/postgres

You'll be prompted to enter a password to connect to the database. The password is...

> abook

Enter the password and hit Enter. You should now be connected to the database. If you encounter errors make sure your database is running and that you entered the password correctly.

Now that we're connected to the database we need to create a database specifically for our application. We can do that by running a SQL command in the SQL Tabs program. Run the following...

> CREATE DATABASE abook;

Our new database is now created, let's disconnect from the default postgres database and connect to the newly created abook database.

Close the tab that has the connection to the postgres database.

Change the connection string to point to the abook database.

> postgres://postgres@localhost:5432/abook

Connect using SQL Tabs (the password will be the same)

We now have a database specifically for our application.
