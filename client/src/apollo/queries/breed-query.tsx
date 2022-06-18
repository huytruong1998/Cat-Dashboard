import { gql } from "@apollo/client";

const FRAGMENT_CATBREED = gql`
  fragment catBreedField on CatBreed {
    id
    name
    description
  }
`;

export const GET_CAT_BREEDS = gql`
  query GetCatBreeds(
    $page: Int!
    $limit: Int!
    $order: String!
    $sort: String!
    $search: String
  ) {
    getCatBreeds(
      page: $page
      limit: $limit
      order: $order
      sort: $sort
      search: $search
    ) {
      hasMoreItems
      catData {
        ...catBreedField
      }
    }
  }
  ${FRAGMENT_CATBREED}
`;

export const GET_CAT_BREED_BY_ID = gql`
  query GetCatBreedById($id: String!) {
    getCatBreedById(id: $id) {
      ...catBreedField
      weight {
        metric
      }
      image {
        url
      }
    }
  }
  ${FRAGMENT_CATBREED}
`;
