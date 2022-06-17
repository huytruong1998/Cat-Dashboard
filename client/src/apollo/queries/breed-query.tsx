import { gql } from "@apollo/client";

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
        id
        name
        description
      }
    }
  }
`;
