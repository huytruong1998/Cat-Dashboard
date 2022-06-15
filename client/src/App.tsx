import DashBoard from "./components/dashboard/DashBoard";
import "./App.scss";
import AppLayout from "./components/layout/AppLayout";

const App = () => {
  return (
    <AppLayout>
      <DashBoard />
    </AppLayout>
  );
};

export default App;
