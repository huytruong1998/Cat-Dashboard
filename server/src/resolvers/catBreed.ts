import axios from "axios";
import { CatBreed } from "../entities/CatBreed";
import {
  Arg,
  Field,
  ID,
  InputType,
  Int,
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
  imageUrl?: string;

  @Field({ nullable: true })
  origin?: string;
}

@Resolver()
export class CatBreedResolver {
  @Query(() => CatBreedListResponse)
  getCatBreeds(
    @Arg("page", () => Int)
    page: number,
    @Arg("limit", () => Int)
    limit: number,
    @Arg("order", () => String)
    order: string,
    @Arg("sort", () => String)
    sort: string,
    @Arg("search", () => String, { nullable: true })
    search?: string
  ): Promise<CatBreedListResponse> {
    let request = `http://localhost:3001/cats?_page=${page}&_sort=${sort}&_order=${order}&_limit=${limit}`;

    if (search) request += `&name_like=${search}`;
    return axios.get<CatBreedListResponse>(request).then((res) => {
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
      resp.catData.forEach((breed: CatBreed) => {
        const breedDate = new Date(parseInt(breed.created_at));
        breed.created_at = breedDate.toISOString().substring(0, 10);
        return breed;
      });

      return resp;
    });
  }

  @Query(() => CatBreed)
  getCatBreedById(
    @Arg("id", () => String)
    id: string
  ): Promise<CatBreed> {
    return axios
      .get<CatBreed>(`http://localhost:3001/cats/${id}`)
      .then((resp) => {
        const breedDate = new Date(parseInt(resp.data.created_at));
        resp.data.created_at = breedDate.toISOString().substring(0, 10);
        return resp.data;
      });
  }

  @Mutation(() => Boolean)
  fetchCatBreeds(): Promise<Boolean> {
    return axios
      .get<CatBreed[]>("https://api.thecatapi.com/v1/breeds")
      .then((resp) => {
        const today = new Date().getTime();
        resp.data.forEach((breed) => (breed.created_at = today.toString()));
        replace("./db.json", "cats", resp.data);
        return true;
      });
  }

  @Mutation(() => CatBreedResponse)
  async updateCatBreed(
    @Arg("id", () => ID) id: string,
    @Arg("data") newCatData: AddCatInput
  ): Promise<CatBreedResponse> {
    const existingBreed = await axios
      .get<CatBreed[]>(
        `http://localhost:3001/cats?name_like=${newCatData.name}&name.length=${newCatData.name.length}&id_ne=${id}`
      )
      .then((resp) => resp.data);

    const fieldErrors: FieldError[] = [];
    if (existingBreed.length > 0)
      fieldErrors.push({
        field: "name",
        message: "The cat breed has already existed!",
      });

    if (newCatData.description.length === 0)
      fieldErrors.push({
        field: "description",
        message: "The description can not be empty!",
      });

    if (fieldErrors.length > 0) {
      return {
        errors: fieldErrors,
      };
    }
    const data: Partial<CatBreed> = {
      name: newCatData.name,
      description: newCatData.description,
      origin: newCatData.origin,
      image: {
        url: newCatData.imageUrl,
      },
    };

    return await axios
      .patch<CatBreedResponse>(`http://localhost:3001/cats/${id}`, data)
      .then((resp) => {
        return {
          data: resp.data as CatBreed,
        };
      });
  }

  @Mutation(() => CatBreedResponse)
  async addCatBreed(
    @Arg("data") newCatData: AddCatInput
  ): Promise<CatBreedResponse> {
    const existingBreed = await axios
      .get<CatBreed[]>(
        `http://localhost:3001/cats?name_like=${newCatData.name}&name.length=${newCatData.name.length}`
      )
      .then((resp) => resp.data);
    const fieldErrors: FieldError[] = [];
    if (existingBreed.length > 0)
      fieldErrors.push({
        field: "name",
        message: "The cat breed has already existed!",
      });

    if (newCatData.name.length === 0)
      fieldErrors.push({
        field: "name",
        message: "The name can not be empty!",
      });

    if (newCatData.description.length === 0)
      fieldErrors.push({
        field: "description",
        message: "The description can not be empty!",
      });

    if (fieldErrors.length > 0) {
      return {
        errors: fieldErrors,
      };
    }

    const data: Partial<CatBreed> = {
      name: newCatData.name,
      description: newCatData.description,
      origin: newCatData.origin,
      image: {
        url: newCatData.imageUrl,
      },
      created_at: new Date().getTime().toString(),
    };

    return axios
      .post<CatBreedResponse>(`http://localhost:3001/cats`, data)
      .then((resp) => {
        return {
          data: resp.data as CatBreed,
        };
      });
  }

  @Mutation(() => Boolean)
  async deleteCatBreed(
    @Arg("id", () => String)
    id: string
  ): Promise<Boolean> {
    await axios.delete(`http://localhost:3001/cats/${id}`);
    return true;
  }
}
