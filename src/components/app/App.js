import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import HomePage from "../pages/HomePage";

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route
            path="/comics"
            element={
              <ErrorBoundary>
                <AppBanner />
                <ComicsList />
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
