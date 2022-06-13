import axios from "axios";
import { AddCatInput, Cat, CatListResponse } from "../entities/Cat";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
// @ts-ignore
import { replace } from "replace-json-property";

@Resolver()
export class CatResolver {
  @Query(() => CatListResponse)
  getCats(
    @Arg("page", () => Number)
    page: number,
    @Arg("limit", () => Number)
    limit: number,
    @Arg("order", () => String)
    order: string,
    @Arg("sort", () => String)
    sort: string
  ): Promise<CatListResponse> {
    return axios
      .get(
        `http://localhost:3001/cats?_order=${order}&_sort=${sort}&_page=${page}&_limit=${limit}`
      )
      .then((res) => {
        const paginationOptions = res.headers["link"]
          .split(", ")
          .map((header) => {
            const splitArr = header.split("; ");
            return (
              splitArr.length > 1 &&
              splitArr[1].replace(/"/g, "").replace("rel=", "")
            );
          });

        const resp: CatListResponse = {
          catData: res.data,
          hasMoreItems: paginationOptions.includes("next"),
        };
        return resp;
      });
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

  @Mutation(() => Cat)
  async addCat(@Arg("data") newCatData: AddCatInput): Promise<Cat> {
    const data: Partial<Cat> = {
      name: newCatData.name,
      description: newCatData.description,
      weight: {
        metric: newCatData.metric_weight,
      },
      image: {
        url: newCatData.image_url,
      },
      life_span: newCatData.life_span,
      wikipedia_url: newCatData.wikipedia_url,
    };

    return await axios
      .post<Cat>(`http://localhost:3001/cats`, data)
      .then((resp) => resp.data);
  }
}
