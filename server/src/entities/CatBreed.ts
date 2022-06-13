import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Weight {
  @Field({ nullable: true })
  imperial?: string;

  @Field({ nullable: true })
  metric?: string;
}

@ObjectType()
class Image {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  url?: string;
}

@ObjectType({ description: "The cat model" })
export class CatBreed {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Weight, { nullable: true })
  weight: Weight;

  @Field(() => Image, { nullable: true })
  image: Image;

  @Field({ nullable: true })
  adaptability: string;

  @Field({ nullable: true })
  affection_level: string;

  @Field({ nullable: true })
  alt_names: string;

  @Field({ nullable: true })
  cfa_url: string;

  @Field({ nullable: true })
  vetstreet_url: string;

  @Field({ nullable: true })
  vcahospitals_url: string;

  @Field({ nullable: true })
  temperament: string;

  @Field({ nullable: true })
  origin: string;

  @Field({ nullable: true })
  life_span: string;

  @Field({ nullable: true })
  indoor: number;

  @Field({ nullable: true })
  lap: number;

  @Field({ nullable: true })
  child_friendly: number;

  @Field({ nullable: true })
  country_code: string;

  @Field({ nullable: true })
  country_codes: string;

  @Field({ nullable: true })
  dog_friendly: number;

  @Field({ nullable: true })
  energy_level: number;

  @Field({ nullable: true })
  experimental: number;

  @Field({ nullable: true })
  grooming: number;

  @Field({ nullable: true })
  hairless: number;

  @Field({ nullable: true })
  health_issues: number;

  @Field({ nullable: true })
  intelligence: number;

  @Field({ nullable: true })
  shedding_level: number;

  @Field({ nullable: true })
  social_needs: number;

  @Field({ nullable: true })
  stranger_friendly: number;

  @Field({ nullable: true })
  vocalisation: number;

  @Field({ nullable: true })
  natural: number;

  @Field({ nullable: true })
  rare: number;

  @Field({ nullable: true })
  rex: number;

  @Field({ nullable: true })
  suppressed_tail: number;

  @Field({ nullable: true })
  short_legs: number;

  @Field({ nullable: true })
  wikipedia_url: string;

  @Field({ nullable: true })
  hypoallergenic: number;

  @Field({ nullable: true })
  reference_image_id: number;
}
