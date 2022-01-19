import React from "react";
import { useState } from "react";
import { getProps } from "./exampleProps";
import DataListInput from "react-datalist-input";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./example.module.css";
import {
  useParams,
  HashRouter,
  useNavigate,
  Outlet,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  encode,
  decode,
  _groupN,
  _rawToTernary,
  _ternaryLookup,
  _ternaryToBinary,
  _binaryToIntegers,
  _bitsWithPadding,
  _rawFromTernary,
  _bitsWithoutPadding,
  _binaryFromIntegers,
} from "../src/index.ts";

// Types
import type { Props } from "./exampleProps";

const asBytes = (input, n = 2) => {
  const bytes = [...input]
    .map((n) => {
      return _groupN(n.toString(16), 2)[0];
    })
    .join("");
  return _groupN(bytes, n, "");
};

const toUint8 = (input) => {
  return Uint8Array.from(input);
};

const parseInput = (input, { radix = 10 }) => {
  const inputList = input
    .map((n) => {
      return parseInt(n, radix);
    })
    .filter((n) => !isNaN(n));
  return toUint8(inputList);
};

const checkPadLen = (v, opts) => {
  const { padLen = 1, sep = " " } = opts;
  if (padLen === 0) {
    return v.split(sep);
  }
  const groups = _groupN(v, padLen, "");
  const vals = sep ? v.split(sep) : groups;
  const uneven = vals.some((s) => {
    return padLen !== s.length;
  });
  return !uneven ? vals : null;
};
const sameLength = ({ length: l0 }, { length: l1 }) => {
  return !!l0 && !!l1 && l0 === l1;
};

const validateString = (_v, opts) => {
  const { radix = 2, sep = " " } = opts;
  const sepRegExp = new RegExp(`[${sep}]+`, "g");
  const v = _v.replace(sepRegExp, sep);
  const goodChars = new Map([[16, "a-f0-9"]]).get(radix) || "0-" + (radix - 1);
  const badChars = `[^${goodChars}${sep}]`;
  const rx = new RegExp(badChars, "g");
  if (v.match(badChars)) {
    return null;
  }
  const vals = checkPadLen(v, opts) || [];
  const parsed = parseInput(vals, { radix, sep });
  if (sameLength(vals, parsed)) {
    return parsed;
  }
  return null;
};

const validateTwoby = (v) => {
  const [sep, padLen, radix] = [" ", 0, 2];
  return validateString(v, { sep, padLen, radix });
};

const validateHex = (v, opts) => {
  return validateString(v, { ...opts, radix: 16 });
};

const validateHexBytes = (v) => {
  return validateHex(v, { padLen: 2, sep: " " });
};

const roundTrip = (in8) => {
  const twoby8 = toUint8(encode(in8));
  const out8 = toUint8(decode(twoby8));
  return { twoby8, out8 };
};

const cap1 = (str) => {
  return str.replace(/^\w/, (c) => {
    return c.toUpperCase();
  });
};

const indexQuality = (i, source = null) => {
  const label = ["worse", "equal", "better"][i];
  return source ? source[label] : label;
};

const compareLength = (in8, source) => {
  const { twoby8 } = roundTrip(in8);
  const diff = Math.sign(in8.length - twoby8.length);
  return indexQuality(diff + 1, source);
};

const StatusStep = (props) => {
  const { text, setText, setLocal } = props;
  const { validate, setInput } = props;
  const canChange = !!validate && !!setInput;
  const ok = !canChange || !!validate(text);

  const onChange = canChange
    ? (e) => {
        const v = e.target.value;
        const result = validate(v);
        if (!!result === true) {
          setInput(result);
          setText(null);
        } else {
          setText(v);
        }
        setLocal(!result);
      }
    : undefined;
  const basicProps = {
    className: styles.bytes,
  };
  const inputProps = {
    ...basicProps,
    value: text,
    onChange,
    maxRows: 12,
    minRows: 1,
  };
  const content = !!validate ? (
    <TextareaAutosize {...inputProps} />
  ) : (
    <div {...basicProps}>{text}</div>
  );

  const labelCls = ok ? styles.equal : styles.error;
  return (
    <div>
      <div className={labelCls}>{props.label}</div>
      {content}
    </div>
  );
};
const toBinary = (value, pad) => {
  const padded = _binaryFromIntegers(value);
  if (pad) {
    return padded;
  }
  return _bitsWithoutPadding(padded);
};

const fromBinary = (binaryInput, radix, padLen = 1) => {
  return binaryInput
    .map((s) => {
      return parseInt(s, 2).toString(radix).padStart(padLen, "0");
    })
    .filter((n) => !isNaN(parseInt(n, radix)));
};

const asTernary = (tern, padLen = 1) => {
  return _groupN(tern.join(""), padLen).filter((n) => !isNaN(parseInt(n, 3)));
};

const toUnitLabel = ({ padLen, numBits }) => {
  const patterns = [
    [".*x24", "byte triads"],
    [".*x8", "bytes"],
    ["1x1", "bits"],
    ["1x.*", "digits"],
    ["2x.*", "pairs"],
    ["3x.*", "triads"],
  ].map(([regex, label]) => ({ regex, label }));
  const key = `${padLen}x${numBits}`;

  return (
    patterns.find(({ regex }) => {
      return key.match(new RegExp(regex));
    })?.label || "???"
  );
};

const toLabel = ({ radix, padLen, numBits }) => {
  const unit = toUnitLabel({ radix, padLen, numBits });
  const base =
    new Map([
      [2, "binary"],
      [3, "ternary"],
      [4, "base-4"],
      [8, "octal"],
      [16, "hex"],
    ]).get(radix) || "???";
  const value = `${base}-${padLen}`;
  return { value, unit, base };
};

const checkTernary = (t, pad, padLen = 1) => {
  if (t.length % padLen !== 0) {
    return null;
  }
  if (t.match(/22/) || t.match(/2$/)) {
    return null;
  }
  const decoded = pad
    ? _rawFromTernary(t)
    : decode(_binaryToIntegers(_bitsWithPadding(_ternaryToBinary(t))));
  const encoded = encode(decoded);
  if (decode(encoded).join(",") !== decoded.join(",")) {
    return null;
  }
  return decoded;
};

const explain = ({ in8, twoby8, pad, choice }) => {
  const ternaryInput = _rawToTernary(in8);
  const binaryInput = ternaryInput.split("2").filter((n) => !!n);

  if (!choice) {
    return [[`Input`, binaryInput, validateTwoby]];
  }

  const { sep, radix, padLen, label, numBits } = choice;
  const clusters =
    radix === 3
      ? 16
      : ((info) => {
          return info % 1 ? 1 : info;
        })(24 / Math.log2(radix));

  const binaryValue = toBinary(twoby8, pad);
  const bitLists = _groupN(binaryValue, numBits);
  const toRadix = (b, p) => fromBinary(b, radix, p);
  function validate(v) {
    return validateString(v, { ...this, radix, sep });
  }
  const validateInput = validate.bind({ padLen: 0 });
  const validateOutput = validate.bind({ padLen });

  const { unit, base } = label;
  const textInput = cap1(`${base} input`);
  const text = cap1(`${base} ${unit}`);

  if (radix === 3) {
    const _tern = [...binaryInput].map((b) => ["2", b]);
    const tern = [].concat(..._tern).slice(1);

    const out = _ternaryLookup(binaryValue);
    return [
      [
        textInput,
        asTernary(tern, 1),
        (i) => {
          const split = i.split(" ");
          const ints = split.map((ii) => {
            return parseInt(ii, 3);
          });
          if (ints.some((ii) => isNaN(ii))) {
            return null;
          }
          if (split.slice(-1).includes("2")) {
            return null;
          }
          return split
            .map((ii) => {
              return parseInt(ii, 2);
            })
            .filter((ii) => !isNaN(ii));
        },
      ],
      [
        text,
        asTernary(out, padLen),
        (i) => {
          if (i.match(/ $/)) {
            return null;
          }
          const str = i.replace(/ +/g, "");
          if (pad && str.length % clusters) {
            return null;
          }
          return checkTernary(str, pad, padLen);
        },
      ],
    ];
  }
  return [
    [textInput, toRadix(binaryInput, 0), validateInput],
    [
      text,
      toRadix(bitLists, padLen),
      (i) => {
        const encoded = validateOutput(i);
        if (encoded) {
          const t = _rawToTernary(encoded);
          const decoded = decode(encoded);
          return checkTernary(t, pad, 1);
        }
      },
    ],
  ];
};

const cycleList = (list, value, i = 1) => {
  const next = list.indexOf(value) + i;
  return list[next % list.length];
};

const StatusInput = (props) => {
  const hasChoice = !!props.choice;
  const value = props.choice?.label?.value || "";
  const { label, choices, choose } = props;

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
  const items = choices.map(({ label, radix }, key) => {
    const { value, unit, base } = label;
    const text = cap1(`${base} ${unit}`);
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
  const dataListProps = {
    placeholder,
    onSelect,
    items,
    match,
    onInput,
    dropdownClassName: styles.dropdown,
    activeItemClassName: styles.active,
    itemClassName: styles.item,
  };
  return <DataListInput {...dataListProps} />;
};

const makeLocal = ({ results, steps }) => {
  return {
    results: new Map(
      results.map((v) => {
        return [v[0], v[1].join(v[2])];
      })
    ),
    steps: new Map(
      steps.map((v, i) => {
        return [v[0], v[1].join(" ")];
      })
    ),
  };
};

const SEP = ",";
const Status = () => {
  const { input } = {
    input: "",
    ...useParams(),
  };
  const navigate = useNavigate();
  const setInput = (in8) => {
    const output = [...in8].join(SEP);
    const pathname = `/${output}`;
    navigate({ pathname });
  };
  const inString = input.split(SEP);
  const in8 = parseInput(inString, {
    radix: 10,
    sep: SEP,
  });
  const msg = compareLength(in8, {
    better: "✓ Encoding is shorter than input",
    worse: "✗ Encoding is longer than input",
    equal: "Encoding is same length as input",
  });
  const msgClass = compareLength(in8, styles);
  const { twoby8, out8 } = roundTrip(in8);

  const results = [
    ["Input hex bytes", asBytes(in8, 2), " "],
    ["Twoby hex bytes", asBytes(twoby8, 2), " "],
    ["Integers", [...out8], ", "],
  ];

  const choices = [
    { radix: 2, padLen: 3 },
    { radix: 2, padLen: 8 },
    { radix: 3, padLen: 2, bits: 3 },
    { radix: 3, padLen: 16, bits: 24 },
    { radix: 4, padLen: 12 },
    { radix: 8, padLen: 8 },
    { radix: 16, padLen: 6 },
  ].map((choice) => {
    const { radix, padLen, bits } = choice;
    const numBits = bits ? bits : Math.ceil(Math.log2(radix ** padLen));
    const label = toLabel({ radix, padLen, numBits });
    return {
      ...choice,
      label,
      numBits,
      sep: " ",
    };
  });

  const [pad, setPad] = useState(true);
  const [choice, setChoice] = useState(null);
  const [local, _setLocal] = useState(false);

  const steps = explain({ in8, twoby8, pad, choice });
  const [localText, setLocalText] = useState(
    makeLocal({
      results,
      steps,
    })
  );
  const setLocal = (value) => {
    _setLocal(value);
    if (value) {
      return;
    }
    setLocalText({
      steps: new Map([]),
      results: new Map([]),
    });
  };

  const choose = (value) => {
    setLocal(false);
    setChoice(value);
  };
  const togglePad = () => {
    setLocal(false);
    setPad(!pad);
  };
  const { padSymbol, padClass } = ((i) => {
    const symbols = { better: "✓" };
    const padClass = indexQuality(i, styles);
    const padSymbol = indexQuality(i, symbols) || "✗";
    return { padClass, padSymbol };
  })(!choice ? 1 : 2 * !!pad);

  return (
    <>
      <div className={styles.intro}>
        <div className={msgClass}>{msg}.</div>
        <div className={styles.result}>
          {results.map(([label, value, sep], key) => {
            const val = [...value].join(sep);
            const validate = !key ? validateHexBytes : null;
            const text = localText.results.get(label) || val;
            const setText = (t) => {
              setLocalText({
                ...localText,
                results: new Map([...localText.results, [label, t]]),
              });
            };
            const statusProps = {
              label,
              text,
              setText,
              key,
              local,
              setLocal,
              validate,
              setInput,
            };
            return <StatusStep {...statusProps} />;
          })}
        </div>
        <h3>Explore</h3>
        <div className={styles.result}>
          {steps.map(([label, value, validate], key) => {
            const val = [...value].join(" ");
            const text = localText.steps.get(label) || val;
            const setText = (t) => {
              setLocalText({
                ...localText,
                steps: new Map([...localText.steps, [label, t]]),
              });
            };
            const statusProps = {
              label,
              text,
              setText,
              key,
              local,
              setLocal,
              validate,
              setInput,
            };
            return <StatusStep {...statusProps} />;
          })}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.inputWrapper}>
          <label> Integer format </label>
          <StatusInput
            {...{
              choices,
              choice,
              choose,
            }}
          />
          <button onClick={togglePad} className={padClass}>
            {padSymbol} Padding
          </button>
        </div>
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

const Examples = ({ inputs }: Props) => {
  return (
    <>
      <h3>Examples</h3>
      <div className={styles.examples}>
        {inputs.map((list, i) => {
          const in8 = toUint8(list);
          const cls = compareLength(in8, styles);
          const text = list.join(", ");
          const path = list.join(",");
          return (
            <Link key={i} className={cls} to={`/${path}`}>
              [{text}]
            </Link>
          );
        })}
      </div>
    </>
  );
};

const Example = (props: Props) => {
  const element = <Status />;
  const examples = <Examples {...props} />;

  const twoby_link = <a href="https://github.com/twoby/twoby">Twoby</a>;

  return (
    <HashRouter history={history}>
      <h2>{twoby_link} (two-separated binary)</h2>
      <div>
        <Routes>
          <Route path="/" element={element}>
            <Route path=":input" element={examples} />;
            <Route path="" element={examples} />;
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

Example.defaultProps = {
  ...getProps("default"),
  inputs: [[0, 0, 0, 0]],
};

export default Example;
