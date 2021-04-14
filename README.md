<div align="center">
  <h1>🌞 Sunday morning project 🌞</h1>
</div>

## Wellcome to the Sunday morning project 🌈

This project is a code challenge for a Sunday Morning company (_name hided_). Here you will find some of my skills in front-end, backend and database.

---

### The project

The project is a CRUD (create, read, update and delete) of a list of Favored record.
The main page is a List, where you can visualize and/or edit record. You can even delete many record by selection. You can create new favored in the add button.

#### You can find the running project here: https://sunday-morning.herokuapp.com/

---

### Running on the local

First of all, clone this repository:

```sh
git clone git@github.com:rhogeranacleto/sunday-morning.git

cd sunday-morning/
```

### With docker

This is the easy whay to do this. You will need to have installed:

- **docker**
- **docker-compose**

Then run the following command:

```sh
docker-compose up server front
```

#### Et voilà 🌈 Now you are able to access `http://localhost:3000/` to see the aplication.

### Manually

Also you can run the project manually (and for dev reasons). You will need to have installed:

- **Node v12.16.2**
- **Yarn v1.22.4**
- A instance of **Postgres v12** running somewhere.

1. Run in the root path `yarn`
1. Inside the `packages/server` folder:
   1. Run `cp ormconfig.dev.json ormconfig.json`
   1. Change the file **ormconfig.json** to point to your running **postgresql** instance.
   1. Run `cp sample.env .env`
   1. Run `yarn`
   1. Run `yarn start:dev`
1. Inside the `packages/front` folder:
   1. Run `cp sample.env .env`
   1. Run `yarn`
   1. Run `yarn start`

#### Et voilà 🌈 Now you are able to access `http://localhost:3000/` to see the aplication.

### Testing

#### Server

The server has only e2e tests, since has no business rules only simple api.

To run the e2e test you will have to keep you postgres instance up and with a schema called **test**. The `docker-compose up postgres` can do it for you. Optionally you can change this configuration in the `ormconfig.json` file, changing the `test` config to use `"schema": "public"`.

To run the tests do the following:

```sh
cd packages/server
yarn test:e2e
```

#### Front

Tests in frontend are made in Cypress. So what you have to do is:

```sh
cd packages/front
yarn start

## then
yarn cypress:open
## or
yarn cypress:run
```

> You will need to keep front up to run this, but you do not need server up.

### Important Notes

> The server always will seed the database with the same 4 banks, and new 30 favoreds in the project start. Since I have to create a populated database, this is the easy way I find to do; since this is a test I don't think is a problem, but I know that this will never happen in a real situation.
