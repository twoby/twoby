import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./status.module.scss";

const Status = (props) => {
  const { text, setText } = props;
  const { validate, setInput } = props;
  const canChange = !!validate && !!setInput;
  const ok = !canChange || !!validate(text);

  const onChange = canChange
    ? (e) => {
        const v = e.target.value;
        const result = validate(v);
        if (!!result === true) {
          setInput(result);
          setText(null);
        } else {
          setText(v);
        }
      }
    : undefined;
  const basicProps = {
    className: styles.bytes,
  };
  const inputProps = {
    ...basicProps,
    value: text,
    onChange,
    maxRows: 12,
    minRows: 1,
  };
  const content = validate ? (
    <TextareaAutosize {...inputProps} />
  ) : (
    <div {...basicProps}>{text}</div>
  );

  const labelCls = ok ? styles.equal : styles.error;
  return (
    <div className={props.cls}>
      <div className={labelCls}>{props.label}</div>
      {content}
    </div>
  );
};

export default Status;
