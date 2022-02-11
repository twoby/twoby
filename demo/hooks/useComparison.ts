import wu from "wu";
import { toUint8, roundTrip } from "../lib/io";

const BYTE = 8;

function* range(n, start = 0) {
  for (let i = start; i < n; i += 1) yield i;
}

const compare = ({ reps, n1, n2 }) => {
  const [x, y] = [n1, n2].map((n) => 2 ** n - 1);
  const input = [].concat(...wu(range(reps)).map(() => [x, y]));
  const { code8 } = roundTrip(toUint8(input));
  const count = code8.length / (2 * reps);
  return { x, y, count };
};

const useComparison = (hash) => {
  const { reps } = hash;
  const domain = BYTE;

  const table = wu(range(domain + 1, 1)).reduce((out, n1) => {
    return [
      ...out,
      ...wu(range(domain + 1, 1)).map((n2) => {
        return compare({ reps, n1, n2 });
      }),
    ];
  }, []);

  return { table };
};

export { useComparison };
