import axios from "axios";
import { Cat } from "../entities/Cat";
import { Query, Resolver } from "type-graphql";
// @ts-ignore
import { replace } from "replace-json-property";

@Resolver()
export class CatResolver {
  @Query(() => [Cat])
  getCats(): Promise<Cat> {
    return axios
      .get<Cat>("http://localhost:3001/cats")
      .then((resp) => resp.data);
  }

  @Query(() => [Cat])
  fetchCats(): Promise<Cat> {
    return axios
      .get<Cat>("https://api.thecatapi.com/v1/breeds")
      .then((resp) => {
        replace("./db.json", "cats", resp.data);
        return resp.data;
      });
  }
}
