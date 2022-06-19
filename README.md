# Cat Breed DashBoard Dialog

This app fetch data from [The Cat API] (https://thecatapi.com) and allow users to interact with the data

# How to run locally

This app require to open 2 terminal to run a server and a client:

**For the server:**

Need to access the `server` folder:

`cd server`

Then need to install dependencies and run the command to execute app:

`npm i && npm run dev`

**For the client:**

Need to access the `client` folder:

`cd client`

Then need to install dependencies and run the command to execute app:

`npm i && npm run serve`

\
After that, the app is on `http://localhost:3000`

the graphql client server can be view on `http://localhost:8000/graphql`

**Note:** unit test can be run on `client` folder, `cd client && npm run test`

# How to use the application

- the Cat API `https://api.thecatapi.com/v1/breeds` will be populated by clicking this button.

![alt text](./images/fetchCat.png)

- When click the table column name, the table data will be sorted according to the column

- **Note:** sorting will be base by [ASCII Table] (https://www.asciitable.com/). Sort order: `0-9` -> `A-B` -> `a-b`

![alt text](./images/sortCat.png)

- The 2 arrows will helps navigate the table

![alt text](./images/pagination.png)

- `Add New` will open dialog to add new breed

![alt text](./images/addCat.png)

- To edit an item, just click directly on the item row to open edit dialog

![alt text](./images/editCat.png)

- To search cat by name, just type in this input and click the search icon

![alt text](./images/searchCat.png)

- To delete an item, click this icon

![alt text](./images/deleteCat.png)
