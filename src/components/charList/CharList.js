import React from "react";
import "./charList.scss";
import { MarvelServices } from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";
import PropTypes from "prop-types";

class CharList extends React.Component {
  state = {
    list: [],
    loading: true,
    error: false,
    loadMoreLoading: false,
    offset: 1550,
    endOfList: false,
  };

  componentDidMount() {
    this.initCharList();
  }

  onCharLoaded = (newList) => {
    if (newList.length < 9) {
      this.setState((state) => ({ ...state, endOfList: true }));
    }
    this.setState(({ list }) => ({
      list: [...list, ...newList],
      loading: false,
      loadMoreLoading: false,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  initCharList = (offset) => {
    new MarvelServices()
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  incOffset = () => {
    this.setState((state) => ({ ...state, offset: state.offset + 9 }));
  };

  loadingMoreItems = () => {
    this.setState((state) => ({
      ...state,
      loadMoreLoading: !state.loadMoreLoading,
    }));
  };

  onLoadMore = () => {
    this.loadingMoreItems();
    this.initCharList(this.state.offset);
    this.incOffset();
  };

  render() {
    const { loading, error, list } = this.state;

    return (
      <div className="char__list">
        {loading ? <Spinner /> : null}
        {error ? <ErrorMsg /> : null}
        <ul className="char__grid">
          {list.map((listItem, i) => (
            <CharListItem
              key={listItem.id}
              {...listItem}
              onCharSelected={this.props.onCharSelected}
              selectedChar={this.props.selectedChar}
            ></CharListItem>
          ))}
        </ul>
        {this.state.loadMoreLoading ? <Spinner /> : null}
        <button
          style={this.state.endOfList ? { display: "none" } : null}
          className="button button__main button__long"
          onClick={this.onLoadMore}
          disabled={this.state.loadMoreLoading}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const CharListItem = ({
  id,
  thumbnail,
  name,
  onCharSelected,
  selectedChar,
}) => {
  const [activeItem, setActiveItem] = React.useState("");
  let ref = React.useRef();
  const imgNotFound =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <li
      tabIndex="0"
      ref={ref}
      key={id}
      className={`char__item ${activeItem}`}
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
