import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import { useMarvelServices } from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";


const ComicsList = () => {
  const { loading, error, getAllCharacters, totalNumber } =
    useMarvelServices();

  const [comicsList, setComicsList] = useState([]);

  const [showBtn, setShowBtn] = useState(true);
  useEffect(() => {
    getNewComics();
  }, []);

  const getNewComics = () => {
    getAllCharacters(comicsList.length, "comics", 8, "comics").then(
      (newList) => {
        if (newList.length < 8) {
          setShowBtn(false);
        }
        return setComicsList((list) => [...list, ...newList]);
      }
    );
  };

  return (
    <div className="comics__list">
      {error && <ErrorMsg></ErrorMsg>}
      <ul className="comics__grid">
        {comicsList.map(({ id, ...rest }) => {
          return <ComicsListItem key={id} comicsList={rest} />;
        })}
      </ul>
      {loading && <Spinner></Spinner>}
      <button
        style={!showBtn ? { display: "none" } : {}}
        onClick={getNewComics}
        className="button button__main button__long"
        disabled={loading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const ComicsListItem = ({ comicsList }) => {
  const { description, title, id, thumbnail, resourceURI, price } = comicsList;
  return (
    <li className="comics__item">
      <a href={resourceURI}>
        <img src={thumbnail} alt={title} className="comics__item-img" />
        <div className="comics__item-name">{title}</div>
        <div className="comics__item-price">
          {price ? price + "$" : "NOT AVAILABLE"}
        </div>
      </a>
    </li>
  );
};

export default ComicsList;
