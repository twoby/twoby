import { cleanText, checkTextEnd } from "./validate";
import { fromBytes } from "./transcode";

const parseEvent = (e) => e.target.value;

const handleText = ({ setInput, setText, options }) => {
  const { textParser } = options.parse;
  return (e) => {
    const txt = parseEvent(e);
    const text = cleanText(txt, options);
    const textOkay = checkTextEnd(text, options);
    if (!textOkay) {
      return setText(text);
    }
    const { decode } = options.code;
    let decoded;
    try {
      const bits = textParser(options)(text).join("");
      const result = fromBytes(bits);
      decoded = decode(result);
    } catch ({ message }) {
      console.warn(message);
      return setText(text);
    }
    setInput(decoded);
    setText(null);
  };
};

export { handleText };
