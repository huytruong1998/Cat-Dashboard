import axios from "axios";
import { CatBreed } from "../entities/CatBreed";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
// @ts-ignore
import { replace } from "replace-json-property";

@ObjectType({ description: "The cat breed list respone" })
export class CatListResponse {
  @Field(() => [CatBreed])
  catData: CatBreed[];

  @Field(() => Boolean)
  hasMoreItems: Boolean;
}

@InputType({ description: "New cat breed input data" })
export class AddCatInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  metric_weight?: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field({ nullable: true })
  life_span?: string;

  @Field({ nullable: true })
  wikipedia_url?: string;
}

@Resolver()
export class CatBreedResolver {
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

  @Query(() => CatBreed)
  getCatById(
    @Arg("id", () => String)
    id: string
  ): Promise<CatBreed> {
    return axios
      .get<CatBreed>(`http://localhost:3001/cats/${id}`)
      .then((resp) => resp.data);
  }

  @Query(() => [CatBreed])
  fetchCats(): Promise<CatBreed[]> {
    return axios
      .get<CatBreed[]>("https://api.thecatapi.com/v1/breeds")
      .then((resp) => {
        replace("./db.json", "cats", resp.data);
        return resp.data;
      });
  }

  @Mutation(() => CatBreed)
  async addCat(@Arg("data") newCatData: AddCatInput): Promise<CatBreed> {
    const data: Partial<CatBreed> = {
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
      .post<CatBreed>(`http://localhost:3001/cats`, data)
      .then((resp) => resp.data);
  }

  @Mutation(() => Boolean)
  async deleteCat(
    @Arg("id", () => String)
    id: string
  ): Promise<Boolean> {
    await axios.delete(`http://localhost:3001/cats/${id}`);
    return true;
  }
}
