import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { handleText } from "../lib/handler";
import styles from "./status.module.scss";

const Status = (props) => {
  const { uuid, label, editable = true } = props;
  const { cache, updateCache } = props;
  const { setInput, options } = props;

  const cached = cache.has(uuid);
  const setText = (t) => updateCache(uuid, t);
  const text = cached ? cache.get(uuid) : props.text;
  const ok = props.text === text;

  const onChange = handleText({
    setInput,
    setText,
    options,
  });

  const basicProps = {
    className: styles.bytes,
  };
  const inputProps = {
    ...basicProps,
    value: text,
    maxRows: 12,
    minRows: 1,
    onChange,
  };
  const content = editable ? (
    <TextareaAutosize {...inputProps} />
  ) : (
    <div {...basicProps}>{text}</div>
  );

  const labelCls = ok ? styles.equal : styles.error;
  return (
    <div>
      <div className={labelCls}>{label}</div>
      {content}
    </div>
  );
};

export default Status;
