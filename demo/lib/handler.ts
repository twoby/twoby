const parseEvent = (e) => e.target.value;

const handleText = ({setInput, setText, validate}) => {
  if (!setInput || !setText || !validate) {
    return undefined;
  }
  return (e) => {
    const text = parseEvent(e);    
    const result = validate(text);
    if (!!result === true) {
      setInput(result);
      setText(null);
    } else {
      setText(text);
    }
  }
}

export {
  handleText
}
