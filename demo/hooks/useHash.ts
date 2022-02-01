import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { parseInput } from "../lib/io";
import { 
  useVars,
  useSetVars,
} from "path-vars";

type HashOptions = {
  radix: number,
  space: string,
}

const FORMATS = (({radix, space}) => {
  return [{
    keys: ['input'],
    empty: [],
    decode: (s) => {
      return parseInput(s.split(space), { radix })
    },
    encode: (a) => {
      const toString = n => n.toString(radix);
      return [...a].map(toString).join(space);
    },
    checkValue: a => true
  }];
})({radix: 10, space: ','})

const useHash = (options: HashOptions) => {
  const nav = useNavigate();
  const params = useParams();
  const opts = {
    ...options,
    formats: FORMATS,
  }
  console.log({params})
  const hash = useVars(params, opts);
  const setHash = useSetVars(nav, opts);
  const updateHash = useMemo(() => {
    return h => setHash({...hash, ...h})
  }, [hash])
  return { hash, setHash, updateHash}
}

export {
  useHash
}
