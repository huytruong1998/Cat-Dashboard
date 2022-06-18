import { gql } from "@apollo/client";
import { FRAGMENT_CATBREED } from "apollo/queries/breed-query";

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

export const EDIT_CAT_BREED = gql`
  mutation UpdateCatBreed($id: ID!, $data: AddCatInput!) {
    updateCatBreed(id: $id, data: $data) {
      data {
        ...catBreedField
      }
      errors {
        field
        message
      }
    }
  }
  ${FRAGMENT_CATBREED}
`;

export const ADD_CAT_BREED = gql`
  mutation AddCatBreed($data: AddCatInput!) {
    addCatBreed(data: $data) {
      data {
        ...catBreedField
      }
      errors {
        field
        message
      }
    }
  }
  ${FRAGMENT_CATBREED}
`;
