import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useState, useEffect } from "react";
import { useMarvelServices } from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../errorMsg/ErrorMsg";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacter } = useMarvelServices();

  useEffect(() => {
    updateRndmChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateRndmChar = () => {
    // setLoading(false);
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

  return (
    <div className="randomchar">
      {loading ? <Spinner></Spinner> : null}
      {error ? <ErrorMsg></ErrorMsg> : null}
      {!error && !loading ? (
        <RandomcharBlock {...char}></RandomcharBlock>
      ) : null}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateRndmChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const RandomcharBlock = (props) => {
  const { name, description, thumbnail, homepage, wiki } = props;

  const imgNotFound =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="randomchar__block">
      <img
        style={thumbnail === imgNotFound ? { objectPosition: "left" } : null}
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
