import { Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import HomePage from "../pages/HomePage";
import ComicsPage from "../pages/ComicsPage";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/comics" element={<ComicsPage></ComicsPage>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
