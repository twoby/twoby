import React from "react";
import Status from "./status";
import styles from "./result.module.scss";

const Header = ({ El, cls = null, msg = "" }) => {
  return <El className={cls}>{msg}</El>;
};

const Result = (props) => {
  const { prefix, header, items, cache } = props;
  const { updateCache, setInput } = props;
  return (
    <div className={props.cls}>
      <Header {...header} />
      <div className={styles.result}>
        {items.map((item, key) => {
          return (
            <Status
              {...{
                ...item,
                uuid: `${prefix}-${key}`,
                updateCache,
                setInput,
                cache,
                key,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Result;
