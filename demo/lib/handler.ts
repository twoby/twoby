import { fromBytes } from "./transcode";
import { validateString, checkPadLen } from "./validate";

const parseEvent = (e) => e.target.value;

const handleText = ({ setInput, setText, options }) => {
  const { textParser } = options.parse;
  const { decode } = options.code;
  return (e) => {
    const text = parseEvent(e);
    const okText = validateString(text, options);
    const okPadding = checkPadLen(text, options);
    if (okText !== text || !okPadding) {
      return setText(okText);
    }
    const bits = textParser(options)(text).join("");
    const result = fromBytes(bits);
    let decoded;
    try {
      decoded = decode(result);
    } catch ({ message }) {
      console.warn(message);
      return setText(okText);
    }
    setInput(decoded);
    setText(null);
  };
};

export { handleText };
