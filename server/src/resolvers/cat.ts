import axios from "axios";
import { Cat } from "../entities/Cat";
import { Arg, Query, Resolver } from "type-graphql";
// @ts-ignore
import { replace } from "replace-json-property";

@Resolver()
export class CatResolver {
  @Query(() => [Cat])
  getCats(
    @Arg("page", () => Number)
    page: number,
    @Arg("limit", () => Number)
    limit: number,
    @Arg("order", () => String)
    order: string,
    @Arg("sort", () => String)
    sort: string
  ): Promise<Cat[]> {
    return axios
      .get<Cat[]>(
        `http://localhost:3001/cats?_page=${page}&_limit=${limit}&_order=${order}&_sort=${sort}`
      )
      .then((resp) => resp.data);
  }

  @Query(() => Cat)
  getCatById(
    @Arg("id", () => String)
    id: string
  ): Promise<Cat> {
    return axios
      .get<Cat>(`http://localhost:3001/cats/${id}`)
      .then((resp) => resp.data);
  }

  @Query(() => [Cat])
  fetchCats(): Promise<Cat[]> {
    return axios
      .get<Cat[]>("https://api.thecatapi.com/v1/breeds")
      .then((resp) => {
        replace("./db.json", "cats", resp.data);
        return resp.data;
      });
  }
}
