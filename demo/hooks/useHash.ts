import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { parseInput } from "../lib/io";
import { useVars, useSetVars } from "path-vars";

type HashOptions = {
  radix: number;
  space: string;
};

const CONFIG = {
  radix: 10,
  space: ",",
  content: ["list", "heat"],
};

const format = ({ radix, space, content }, p) => {
  const page = content.includes(p) ? p : content[0];
  const keys =
    {
      heat: ["reps", "input"],
      list: ["input"],
    }[page] || [];
  const inKeys = (k) => keys.includes(k);
  const formats = [
    {
      keys: ["reps"].filter(inKeys),
      empty: 2,
      decode: (s) => parseInt(s, 10),
      encode: (v) => v.toString(10),
      checkValue: (v) => v > 1,
    },
    {
      keys: ["input"].filter(inKeys),
      empty: [],
      decode: (s) => {
        return parseInput(s, { sep: space, radix });
      },
      encode: (a) => {
        const toString = (n) => {
          if (n === undefined) {
            console.log({ n });
          }
          return n.toString(radix);
        };
        return [...a].map(toString).join(space);
      },
      checkValue: () => true,
    },
  ];
  const root = ["", page, ""].join("/");
  return { formats, root };
};

const useHash = (options: HashOptions) => {
  const nav = useNavigate();
  const params = useParams();
  const pathList = useLocation().pathname.split("/");
  const { formats, root } = format(CONFIG, pathList[1]);
  const opts = { ...options, formats, root };
  const hash = useVars(params, opts);
  const setHash = useSetVars(nav, opts);
  const updateHash = useMemo(() => {
    return (h) => setHash({ ...hash, ...h });
  }, [hash]);
  return { hash, setHash, updateHash };
};

export { useHash };
