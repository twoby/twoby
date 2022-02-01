import { useState, useEffect } from "react";

const useCache = ( history ) => {
  const [cache, setCache] = useState(new Map());
  history.listen(() => {
    setCache(new Map())
  })
  const updateCache = (k, v) => {
    setCache(new Map([...cache, [k, v]]));
  }
  return {
    cache, setCache, updateCache
  }
}

export {
  useCache
}
