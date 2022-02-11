import { useState } from "react";

const useCache = (history) => {
  const [cache, setCache] = useState(new Map());
  history.listen(() => {
    setCache(new Map());
  });
  const updateCache = (k, v) => {
    if (v === null) {
      return setCache(new Map());
    }
    setCache(new Map([...cache, [k, v]]));
  };
  return {
    cache,
    setCache,
    updateCache,
  };
};

export { useCache };
