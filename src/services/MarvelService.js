import useHttps from "../hooks/https.hook";

export const useMarvelServices = () => {
  const { loading, error, request: getResource } = useHttps();
  const _urlBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=fe959d891425e7dd4c109cfacc598d46";
  const _baseOffset = 210;
  let totalNumber = null;

  const getAllCharacters = (
    offset = _baseOffset,
    characters = "characters",
    limit = 9,
    cb
  ) => {
    return getResource(
      `${_urlBase}${characters}?limit=${limit}&offset=${offset}&${_apiKey}`
    ).then((res) => {
      return res.results.map(
        cb === undefined ? _transformCharacter : _transformComics
      );
    });
  };

  const getCharacter = async (id) => {
    return await getResource(`${_urlBase}characters/${id}?${_apiKey}`).then(
      (res) => _transformCharacter(res.results[0])
    );
  };

  const _transformCharacter = (data) => {
    return {
      id: data.id,
      name: data.name,
      description: !data.description
        ? "Немає опису"
        : data.description.length < 150
        ? data.description.slice(0, 150)
        : `${data.description.slice(0, 145)} ...`,
      thumbnail: data.thumbnail.path + "." + data.thumbnail.extension,
      homepage: data.urls[0].url,
      wiki: data.urls[1].url,
      comics: data.comics.items,
    };
  };

  const _transformComics = (data) => {
    return {
      id: data.id,
      title: data.title,
      description: !data.description
        ? "Немає опису"
        : data.description.length < 150
        ? data.description.slice(0, 150)
        : `${data.description.slice(0, 145)} ...`,
      thumbnail: data.thumbnail.path + "." + data.thumbnail.extension,
      resourceURI: data.resourceURI,
      price: data.prices[0].price,
    };
  };

  return { loading, error, getAllCharacters, getCharacter, totalNumber };
};
