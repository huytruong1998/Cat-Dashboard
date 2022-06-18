import DashBoard from "./components/dashboard/DashBoard";
import "./App.scss";
import AppLayout from "./components/layout/AppLayout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { DashBoardProvider } from "context/DashBoardContext";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <DashBoardProvider>
          <DashBoard />
        </DashBoardProvider>
      </AppLayout>
    </ApolloProvider>
  );
};

export default App;
