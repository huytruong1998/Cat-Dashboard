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

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class CatBreedResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CatBreed, { nullable: true })
  data?: CatBreed;
}

@ObjectType({ description: "The cat breed list respone" })
export class CatBreedListResponse {
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
  @Query(() => CatBreedListResponse)
  getCats(
    @Arg("page", () => Number)
    page: number,
    @Arg("limit", () => Number)
    limit: number,
    @Arg("order", () => String)
    order: string,
    @Arg("sort", () => String)
    sort: string
  ): Promise<CatBreedListResponse> {
    return axios
      .get<CatBreedListResponse>(
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

        const resp: CatBreedListResponse = {
          catData: res.data as unknown as CatBreed[],
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

  @Mutation(() => CatBreedResponse)
  async addCat(
    @Arg("data") newCatData: AddCatInput
  ): Promise<CatBreedResponse> {
    const existingBreed = await axios
      .get<CatBreed[]>(
        `http://localhost:3001/cats?name_like=${newCatData.name}&&name.length=${newCatData.name.length}`
      )
      .then((resp) => resp.data);
    if (existingBreed.length > 0)
      return {
        errors: [
          {
            field: "name",
            message: "The cat breed has already existed!",
          },
        ],
      };

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
      .post<CatBreedResponse>(`http://localhost:3001/cats`, data)
      .then((resp) => {
        const res: CatBreedResponse = {
          data: resp.data as CatBreed,
        };
        return res;
      });
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
