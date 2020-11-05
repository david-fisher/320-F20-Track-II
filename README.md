# 320-F20-Track-II

# Differential Team database: how to build
1. Install postgreSQL:  
https://www.postgresql.org/download/

2. Add `PostgreSQL/[version, either 12 or 13]/bin` and `PostgreSQL/[version, either 12 or 13]/lib` to PATH (on Windows) or make it an environment variable on Mac/Linux

3. in command prompt or terminal, call `psql -U postgres -f [full filepath to database_setup.sql]`.
note: The file `database_setup.sql` can currently be found in the `erd-implementation` branch in the `database` folder.


# how to connect to database from react.js
1. run `npm install all` within the directory containing `package.json` to install all dependencies for the pg package, which is the library used to communicate between the PostgreSQL database and the react.js app, as well as all other dependencies outlined in the `package_lock.json` file

2. The app can be run with `nodejs goon-universe/app.js`.

3. Using the functions outlined in `queries.js`, which implements the REST API enumerated in `app.js`, frontend teams can now interact with the database from their React.js app as usual.

4. Worth noting: the `pg` package's use depends on certain user credentials used to access a common database (namely, the username/password for the postgresql database which you've set up using `database_setup.sql`). Since the git repository is public, it's a security risk to store these credentials in public on the clear web. Thus, we are using a .env file (locally, for now) to store these credentials. **You will not be able to access the database from the React app without a properly configured .env file!**

# For testing: populating the database with dummy data
1. in command prompt or terminal, run `psql -U [user] -f [full filepath to insert_example_data.sql]`. This file can currently be found in the `erd-implementation` branch in the `database` directory.
