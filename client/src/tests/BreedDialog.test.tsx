import { MockedProvider } from "@apollo/client/testing";
import { GET_CAT_BREED_BY_ID } from "apollo/queries/breed-query";
import BreedDialog from "components/dashboard/dialog/BreedDialog";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { DashBoardContext } from "context/DashBoardContext";
import { mockContext } from "./mockData/mockContext";
import { ADD_CAT_BREED, EDIT_CAT_BREED } from "apollo/mutations/breed-mutation";

const mockCatBreed = {
  id: "catId",
  name: "Test Cat",
  origin: "America",
  description: "This cat is from america",
  created_at: "2022-06-19",
  image: {
    url: "ImageLink",
  },
};

describe("BreedDialog", () => {
  afterEach(cleanup);
  const handleClose = jest.fn();

  describe("should show add new breed dialog", () => {
    it("should render component", async () => {
      render(
        <DashBoardContext.Provider value={mockContext}>
          <MockedProvider mocks={[]} addTypename={false}>
            <BreedDialog open={true} handleClose={handleClose} />
          </MockedProvider>
        </DashBoardContext.Provider>
      );

      expect(screen.getByText("Add New Cat Breed")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    });

    it("should add new breed", async () => {
      const mockAddBreed = {
        request: {
          query: ADD_CAT_BREED,
          variables: {
            data: {
              name: "",
              description: "",
              origin: "",
              imageUrl: "",
            },
          },
        },
        newData: jest.fn(() => ({ data: mockCatBreed })),
      };
      render(
        <DashBoardContext.Provider value={mockContext}>
          <MockedProvider mocks={[mockAddBreed]} addTypename={false}>
            <BreedDialog open={true} handleClose={handleClose} />
          </MockedProvider>
        </DashBoardContext.Provider>
      );

      const addButton = screen.getByRole("button", { name: /Add/i });
      fireEvent.click(addButton);

      expect(mockAddBreed.newData).toHaveBeenCalled();
    });
  });

  describe("should render edit breed dialog", () => {
    const mockGetBreedId = {
      request: {
        query: GET_CAT_BREED_BY_ID,
        variables: {
          id: "catId",
        },
      },
      newData: jest.fn(() => ({ data: mockCatBreed })),
    };
    it("should show edit breed dialog", async () => {
      render(
        <MockedProvider mocks={[mockGetBreedId]} addTypename={false}>
          <DashBoardContext.Provider value={mockContext}>
            <BreedDialog
              open={true}
              handleClose={handleClose}
              breedId="catId"
            />
          </DashBoardContext.Provider>
        </MockedProvider>
      );
      expect(mockGetBreedId.newData).toHaveBeenCalled();
      expect(screen.getByText("Cat Breed Edit")).toBeTruthy();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("should update cat breed", async () => {
      const mockEditBreedId = {
        request: {
          query: EDIT_CAT_BREED,
          variables: {
            id: "catId",
            data: {
              name: "",
              description: "",
              origin: "",
              imageUrl: "",
            },
          },
        },
        newData: jest.fn(() => ({ data: mockCatBreed })),
      };
      render(
        <MockedProvider
          mocks={[mockGetBreedId, mockEditBreedId]}
          addTypename={false}
        >
          <DashBoardContext.Provider value={mockContext}>
            <BreedDialog
              open={true}
              handleClose={handleClose}
              breedId="catId"
            />
          </DashBoardContext.Provider>
        </MockedProvider>
      );
      const addButton = screen.getByRole("button", { name: /Save/i });
      fireEvent.click(addButton);
      expect(mockEditBreedId.newData).toHaveBeenCalled();
    });
  });
});
