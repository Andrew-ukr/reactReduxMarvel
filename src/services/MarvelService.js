import useHttps from "../hooks/https.hook";

const useMarvelServices = () => {
  const { loading, error, request: getResource } = useHttps();

  const _urlBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=fe959d891425e7dd4c109cfacc598d46";
  const _baseOffset = 210;

  // getResource = async (url) => {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       throw new Error("Halepa !!!!!!!!!!!!!!");
  //     }
  //     const { data } = await res.json();
  //     return data;
  //   } catch {
  //     throw new Error("Halepa !!!!!!!!!!!!!!");
  //   }
  // };

  const getAllCharacters = (offset = _baseOffset) => {
    return getResource(
      `${_urlBase}characters?limit=9&offset=${offset}&${_apiKey}`
    ).then((res) => res.results.map(_transformCharacter));
  };

  const getCharacter = async (id) => {
    return await getResource(
      `${_urlBase}characters/${id}?${_apiKey}`
    ).then((res) => _transformCharacter(res.results[0]));
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

  return { loading, error, getAllCharacters, getCharacter };
}

export default useMarvelServices;