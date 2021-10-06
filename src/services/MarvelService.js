export class MarvelServices {
    _urlBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=ec46396726eec0ee71af390e24f31289";

    getResource = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Halepa !!!!!!!!!!!!!!");
            }
            const { data } = await res.json();
            return data;
        } catch {
            throw new Error("Halepa !!!!!!!!!!!!!!");
        }
    };

    getAllCharacters = () => {
        return this.getResource(
            `${this._urlBase}characters?limit=9&${this._apiKey}`
        ).then((res) => res.results.map(this._transformCharacter));
    };

    getCharacter = async (id) => {
        return await this.getResource(
            `${this._urlBase}characters/${id}?${this._apiKey}`
        ).then((res) => this._transformCharacter(res.results[0]));
    };

    _transformCharacter = (data) => {
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
        };
    };
}
