## Setup

---

For the first time setup, you need to install all the package needed, you could do that by open the terminal by pressing `` ctrl + `  ``.

After the terminal opened, type `npm install` in the terminal, and wait until all the installation completed. This will install all the package needed for the API.

Next, you can create a new file named `.env` and inside type this:

```
DB_USERNAME=<your database username>
DB_PASSWORD=<your database password>
DB_NAME=<your desired database name>
DB_HOST=<host address>
DB_DIALECT=<your database accent, since I'm using postgres, just fill this with postgres>
```

Make sure you have installed postgres before. You can install it [here](https://www.postgresql.org/download/)

After you're done making the `.env` file, go back to the terminal and type `npx sequelize db:create`. This will create the database using your configuration.

After you're done creating the database, type `npx sequelize db:migrate`. This will create the table in the database.

To run the server you can simply type `npm run start` on your console, and it will run the local server on http://localhost:3000. Now you can hit the API using [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)

For the API Documentation plase visit https://documenter.getpostman.com/view/14405083/TzRLkASZ#1e3bfbd4-3e78-4fbb-8a27-a65a2ba8992b
