import "./comicsList.scss";
import { useMarvelServices } from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";
import { Link, useLocation } from "react-router-dom";

const ComicsList = () => {
  const { loading, error, getAllCharacters } = useMarvelServices();
  const [comicsList, setComicsList] = useState([]);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    getNewComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {comicsList.map((el) => {
          return <ComicsListItem key={el.id} comicsList={el} />;
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
  const { pathname } = useLocation();

  const { title, thumbnail, price, id } = comicsList;
  return (
    <li className="comics__item">
      <Link to={`${pathname}/${id}`}>
        <img src={thumbnail} alt={title} className="comics__item-img" />
        <div className="comics__item-name">{title}</div>
        <div className="comics__item-price">
          {price ? price + "$" : "NOT AVAILABLE"}
        </div>
      </Link>
    </li>
  );
};

export default ComicsList;
