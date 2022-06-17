import DashBoard from "./components/dashboard/DashBoard";
import "./App.scss";
import AppLayout from "./components/layout/AppLayout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "components/Profile/Profile";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AppLayout>
    </ApolloProvider>
  );
};

export default App;
