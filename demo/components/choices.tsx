import React from "react";
import styles from "./choices.module.scss";
import DataListInput from "react-datalist-input";
import { toLabel } from "../lib/label";

const ChoiceList = (props) => {
  const hasChoice = !!props.choice;
  const { choices, choose } = props;
  const { choiceStyles } = props;
  const labels = choices.map(toLabel);

  const onInput = () => {
    choose(null);
  };
  const onSelect = ({ key }) => {
    choose(
      choices.find((_, i) => {
        return labels[i].value === key;
      }) || null
    );
  };
  const placeholder = `Explore encodings...`;
  const items = labels.map((label) => {
    return {
      key: label.value,
      label: label.text,
    };
  });
  const match = (val, { label }) => {
    if (hasChoice) {
      return true;
    }
    return val.split(" ").some((v) => {
      return label.match(new RegExp(`(^| )${v}`, "i"));
    });
  };
  const choiceProps = {
    ...choiceStyles,
    placeholder,
    onSelect,
    items,
    match,
    onInput,
  };
  return <DataListInput {...choiceProps} />;
};

const Choices = (props) => {
  const { togglePad, qualia, pad } = props;
  const padIndex = !props.choice ? 1 : 2 * !!pad;
  const { symbol: padSymbol } = qualia[padIndex];
  const { className } = qualia[padIndex];

  const choiceStyles = {
    dropdownClassName: styles.dropdown,
    activeItemClassName: styles.active,
    itemClassName: styles.item,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <span>Integer format</span>
      </div>
      <ChoiceList {...{ ...props, choiceStyles }} />
      <div className={styles.right}>
        <button onClick={togglePad} className={className}>
          {padSymbol} Padding
        </button>
      </div>
    </div>
  );
};

export default Choices;
