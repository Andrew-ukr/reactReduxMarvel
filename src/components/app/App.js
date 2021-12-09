import { Routes, Route, Navigate } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import HomePage from "../pages/HomePage";
import ComicsPage from "../pages/ComicsPagePage";
import SingleComicPage from "../pages/SingleComic";

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/comics" element={<ComicsPage></ComicsPage>} />
          <Route
            path="/comics/:id"
            element={<SingleComicPage></SingleComicPage>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
