import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./status.module.scss";

const Status = (props) => {
  const { text, setText } = props;
  const { validate, onChange } = props;
  const ok = !validate || validate(text);

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
  const content = validate ? (
    <TextareaAutosize {...inputProps} />
  ) : (
    <div {...basicProps}>{text}</div>
  );

  const labelCls = ok ? styles.equal : styles.error;
  return (
    <div>
      <div className={labelCls}>{props.label}</div>
      {content}
    </div>
  );
};

export default Status;
