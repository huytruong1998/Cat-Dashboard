import { Field, ObjectType } from "type-graphql";

@ObjectType()
class CatWeight {
  @Field({ nullable: true })
  imperial: string;

  @Field({ nullable: true })
  metric: string;
}

@ObjectType()
class CatImage {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;

  @Field({ nullable: true })
  url: string;
}

@ObjectType({ description: "The cat model" })
export abstract class Cat {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  adaptability: string;

  @Field()
  affection_level: string;

  @Field({ nullable: true })
  weight: CatWeight;

  @Field({ nullable: true })
  image: CatImage;

  @Field()
  alt_names: string;

  @Field()
  cfa_url: string;

  @Field()
  vetstreet_url: string;

  @Field()
  vcahospitals_url: string;

  @Field()
  temperament: string;

  @Field()
  origin: string;

  @Field()
  life_span: string;

  @Field()
  indoor: number;

  @Field()
  lap: number;

  @Field()
  child_friendly: number;

  @Field()
  country_code: string;

  @Field()
  country_codes: string;

  @Field()
  description: string;

  @Field()
  dog_friendly: number;

  @Field()
  energy_level: number;

  @Field()
  experimental: number;

  @Field()
  grooming: number;

  @Field()
  hairless: number;

  @Field()
  health_issues: number;

  @Field()
  intelligence: number;

  @Field()
  shedding_level: number;

  @Field()
  social_needs: number;

  @Field()
  stranger_friendly: number;

  @Field()
  vocalisation: number;

  @Field()
  natural: number;

  @Field()
  rare: number;

  @Field()
  rex: number;

  @Field()
  suppressed_tail: number;

  @Field()
  short_legs: number;

  @Field()
  wikipedia_url: string;

  @Field()
  hypoallergenic: number;

  @Field()
  reference_image_id: number;
}
