import { Component, useState, useEffect } from "react";
import "./charInfo.scss";
import { MarvelServices } from "../../services/MarvelService.js";
import ErrorMsg from "../errorMsg/ErrorMsg";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [char, setChar] = useState(null);

  // state = {
  //   loading: false,
  //   error: false,
  //   char: null,
  // };

  useEffect(() => {
    onUpdateCharId(props.selectedChar);
  }, [props.selectedChar]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.onUpdateCharId(this.props.selectedChar);
  //     // console.log(this.props.selectedChar);
  //   }
  // }

  const onUpdateCharId = (id) => {
    setLoading(true);
    setError(false);
    // this.setState((state) => ({ ...state, loading: true, error: false }));

    new MarvelServices()
      .getCharacter(id)
      .then(
        (char) => {
          setChar(char);
          setLoading(false);
        }
        // this.setState((state) => ({ ...state, char, loading: false }))
      )
      .catch(
        (err) => {
          setLoading(false);
          setError(true);
        }
        // this.setState((state) => ({ ...state, error: true, loading: false }))
      );

    // для виклику помилки в компоненті
    //this.foo.to();
  };

  // const { loading, error, char } = this.state;

  const sceleton = loading || error || char ? null : <Skeleton></Skeleton>;
  const loadingComp = loading ? <Spinner></Spinner> : null;
  const errorComp = error ? <ErrorMsg></ErrorMsg> : null;
  const charCom = char && !loading && !error ? <View char={char}></View> : null;

  return (
    <div className="char__info">
      {sceleton}
      {loadingComp}
      {errorComp}
      {charCom}
    </div>
  );
};

const View = ({ char }) => {
  const { description, homepage, name, thumbnail, wiki, comics } = char;
  const imgNotFound =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={imgNotFound ? { objectPosition: "left" } : null}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? "немає коміксів" : null}
        {comics.slice(0, 5).map((comicsItem, i) => {
          return (
            <li className="char__comics-item" key={i}>
              {comicsItem.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
