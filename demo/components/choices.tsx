import React from "react";
import DataListInput from "react-datalist-input";

const Choices = (props) => {
  const hasChoice = !!props.choice;
  const { choices, choose } = props;
  const { choiceStyles } = props;

  const onInput = () => {
    choose(null);
  };
  const onSelect = ({ key }) => {
    choose(
      choices.find(({ label }) => {
        return label.value === key;
      }) || null
    );
  };
  const placeholder = `Explore Twoby encoding...`;
  const items = choices.map(({ label, radix }) => {
    const { value, unit, base, text } = label;
    return {
      unit,
      base,
      radix,
      key: value,
      label: text,
    };
  });
  const match = (val, { base, radix, unit }) => {
    if (hasChoice) {
      return true;
    }
    const ibase = `${radix}`;
    return val.split(" ").some((v) => {
      const rx = new RegExp("^" + v, "i");
      return unit.match(rx) || base.match(rx) || ibase.match(rx);
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

export default Choices;
