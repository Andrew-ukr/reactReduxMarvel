import React, {useState, useEffect} from "react";
import "./charList.scss";
import { MarvelServices } from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";
import PropTypes from "prop-types";

const CharList = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [offset, setOffset] = useState(219);
  const [endOfList, setEndOfList] = useState(false);

  useEffect(() => {
    initCharList();
  }, []);

  const onCharLoaded = (newList) => {
    if (newList.length < 9) {
      setEndOfList(true);
    }
    setList((list) => [...list, ...newList]);
    setLoading(false);
    setLoadMoreLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const initCharList = (offset) => {
    new MarvelServices()
      .getAllCharacters(offset)
      .then(onCharLoaded)
      .catch(onError);
  };

  const incOffset = () => {
    setOffset((offset) => offset + 9);
  };

  const loadingMoreItems = () => {
    setLoadMoreLoading((loadMoreLoading) => !loadMoreLoading);
  };

  const onLoadMore = () => {
    loadingMoreItems();
    initCharList(offset);
    incOffset();
  };

  return (
    <div className="char__list">
      {loading ? <Spinner /> : null}
      {error ? <ErrorMsg /> : null}
      <ul className="char__grid">
        {list.map((listItem, i) => (
          <CharListItem
            key={listItem.id}
            {...listItem}
            onCharSelected={props.onCharSelected}
            selectedChar={props.selectedChar}
          ></CharListItem>
        ))}
      </ul>
      {loadMoreLoading ? <Spinner /> : null}
      <button
        style={endOfList ? { display: "none" } : null}
        className="button button__main button__long"
        onClick={onLoadMore}
        disabled={loadMoreLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const CharListItem = ({
  id,
  thumbnail,
  name,
  onCharSelected,
  selectedChar,
}) => {
  const imgNotFound =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <li
      tabIndex="0"
      key={id}
      className={`char__item`}
      onClick={(e) => {
        onCharSelected(id);
      }}
    >
      <img
        src={thumbnail}
        alt={name}
        style={thumbnail === imgNotFound ? { objectPosition: "left" } : null}
      />
      <div className="char__name">{name}</div>
    </li>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
