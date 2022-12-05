import express, { Express } from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
var cors = require("cors");
import { CatBreedResolver } from "./resolvers/catBreed";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CatBreedResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();
  const app: Express = express();
  app.use(cors());

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("hello world"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
