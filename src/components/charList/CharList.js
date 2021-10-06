import React from "react";
import "./charList.scss";
import { MarvelServices } from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";

class CharList extends React.Component {
    state = {
        list: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.initCharList();
    }

    onCharLoaded = (list) => {
        this.setState({ list, loading: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    initCharList = () => {
        new MarvelServices()
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const { loading, error, list } = this.state;

        return (
            <div className="char__list">
                {loading ? <Spinner /> : null}
                {error ? <ErrorMsg /> : null}
                <ul className="char__grid">
                    {list.map((el) => (
                        <CharListItem {...el}></CharListItem>
                    ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const CharListItem = ({ id, thumbnail, name }) => {
    const imgNotFound =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

    return (
        <li key={id} className="char__item">
            <img
                src={thumbnail}
                alt={name}
                style={
                    thumbnail === imgNotFound ? { objectFit: "contain" } : null
                }
            />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharList;
