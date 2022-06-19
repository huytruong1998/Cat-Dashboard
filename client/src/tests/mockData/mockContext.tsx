export const mockContext = {
  dashboardState: {
    variables: {
      page: 1,
      limit: 10,
      order: "desc",
      sort: "created_at",
      search: "",
    },
    displayList: [],
  },
  updateList: jest.fn(),
  updateVariables: jest.fn(),
};
