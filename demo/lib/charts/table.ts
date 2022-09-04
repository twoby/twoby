const SIGNALS = [
  {
    name: "click",
    value: {},
    on: [{ events: "rect:click", update: "datum" }],
  },
];

const SPEC = {
  width: 400,
  height: 200,
  padding: 5,
  $schema: "https://vega.github.io/schema/vega/v5.json",
  signals: SIGNALS,
  data: [
    { name: "table" },
    {
      name: "text",
      transform: [
        {
          type: "formula",
          as: "byteText",
          expr: "datum.nBytes + ' per integer'",
        },
      ],
    },
  ],
};

const XY = {
  axes: [
    { orient: "top", title: "1st Integer", scale: "x" },
    { orient: "left", title: "2nd Integer", scale: "y" },
  ],
};

const toColorScale = (opts) => {
  const range = { scheme: "blueorange" };
  const flags = { nice: true, reverse: true };
  return { range, type: "linear", ...flags, ...opts };
};

const toBandScale = ({ field, ...opts }) => {
  const domain = { data: "table", field };
  return { domain, type: "band", ...opts };
};

const toScale = {
  color: (opts) => toColorScale({ name: "color", ...opts }),
  x: (opts) => toBandScale({ name: "x", range: "width", ...opts }),
  y: (opts) => toBandScale({ name: "y", range: "height", ...opts }),
};

const toSpec = (shape: Shape, domain: Domain) => {
  const xField = "x";
  const yField = "y";
  const x = { field: xField };
  const y = { field: yField };
  const z = { domain };
  return {
    ...XY,
    ...SPEC,
    ...shape,
    scales: [toScale.x(x), toScale.y(y), toScale.color(z)],
    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: xField },
            y: { scale: "y", field: yField },
            width: { scale: "x", band: 1 },
            height: { scale: "y", band: 1 },
            fill: { scale: "color", field: "count" },
          },
          update: {
            fill: { scale: "color", field: "count" },
          },
          hover: {
            fill: { value: "red" },
          },
        },
      },
      {
        type: "text",
        interactive: false,
        from: { data: "text" },
        encode: {
          enter: {
            x: { signal: "width", offset: -5 },
            y: { signal: "height", offset: 24 },
            fill: { value: "black" },
            fontSize: { value: 18 },
            align: { value: "right" },
            text: { field: "byteText" },
          },
        },
      },
    ],
    legends: [
      {
        fill: "color",
        type: "gradient",
        orient: "bottom",
        direction: "horizontal",
        title: ["Bytes per int"],
        titleFontSize: 12,
        titlePadding: 4,
      },
    ],
  };
};

export { toSpec };
