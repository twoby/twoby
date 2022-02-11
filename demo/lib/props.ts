type Options = Record<string, unknown>;
type OptionsTuple = [string, Options];

export type Props = {
  hashRoot: string;
  options: Options;
  inputs?: number[][];
};

const getAllProps = () => {
  const hist = {
    hashRoot: "",
    hashSlash: "#",
  };
  const optionList: OptionsTuple[] = [["default", {}]];
  return new Map<string, Props>(
    optionList.map(([key, options]) => {
      return [key, { options, hist }];
    })
  );
};

const getProps: GetProps = (key: string) => {
  return getAllProps().get(key);
};

export { getProps };
