import errorGif from "./error.gif";

export default function ErrorMsg() {
    return <img className="error-gif" src={errorGif} alt="Error" />;
}
