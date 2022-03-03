import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { parseInput } from "../lib/io";
import { useVars, useSetVars } from "path-vars";

type HashOptions = {
  radix: number;
  space: string;
};

const PAGES = {
  heat: ["reps", "input"],
  text: ["input"],
  list: ["input"],
};

const CONFIG = {
  radix: 10,
  space: ",",
  content: Object.keys(PAGES),
};

const format = ({ radix, space, content }, page) => {
  const keys = PAGES[page] || [];
  const inKeys = (k) => keys.includes(k);
  const formats = [
    {
      keys: ["reps"].filter(inKeys),
      empty: 1,
      decode: (s) => parseInt(s, 10),
      encode: (v) => v.toString(10),
      checkText: (s) => !isNaN(parseInt(s, 10)),
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

const usePage = () => {
  const p = useLocation().pathname.split("/")[1];
  return CONFIG.content.includes(p) ? p : "text";
};

const useHash = (options: HashOptions) => {
  const nav = useNavigate();
  const params = useParams();
  const { formats, root } = format(CONFIG, usePage());
  const opts = { ...options, formats, root };
  const hash = useVars(params, opts);
  const setHash = useSetVars(nav, opts);
  const updateHash = useMemo(() => {
    return (h) => setHash({ ...hash, ...h });
  }, [hash]);
  return { hash, setHash, updateHash };
};

export { useHash, usePage };
