type Options = Record<string, unknown>;
type OptionsTuple = [string, Options];

export type Props = {
  options?: Options;
  inputs?: number[][];
};

const getAllProps = () => {
  const optionList: OptionsTuple[] = ([
    ["default", {}],
  ]);
  return new Map<string, Props>(
    optionList.map(([key, options]) => {
      return [key, { options }];
    })
  );
};

const getProps: GetProps = (key: string) => {
  return getAllProps().get(key);
};

export {
  getProps
}
