import { gql } from "@apollo/client";

export const FETCH_CAT_BREEDS = gql`
  mutation FetchCatBreeds {
    fetchCatBreeds
  }
`;

export const DELETE_CAT_BREED = gql`
  mutation DeleteCatBreed($id: String!) {
    deleteCatBreed(id: $id)
  }
`;
