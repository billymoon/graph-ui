const serverDefaults = {
  DATA_FILENAME: "data.ndjson",
  VERCEL: null,
  LICHESS_CLIENT_ID: "graph-ui",
  ENCRYPTION_KEY:
    "bdf72e1917823ee68d5ce655a5a4b8fce8e17ab555a8b0521bf7322ff83bcdf9",
  ENCRYPTION_IV: "0b6b8035ac5b9439344b1f3ecd313f39",
  JWT_SECRET: "e499dbd1dc9ca3f6c86585bc861ba0bc00a0e8dc",
  FONT: "Roboto",
  dev: process.env.NODE_ENV !== "production",
};

const serverRuntimeConfig = {
  rootDirname: __dirname,
  ...serverDefaults,
  ...Object.entries(process.env).reduce(
    (memo, [key, val]) =>
      Object.keys(serverDefaults).includes(key)
        ? { ...memo, [key]: val }
        : memo,
    {}
  ),
};

const publicKeys = ["NODE_ENV", "dev", "FONT"];
const publicRuntimeConfig = Object.entries(serverRuntimeConfig).reduce(
  (memo, [key, val]) =>
    publicKeys.includes(key) ? { ...memo, [key]: val } : memo,
  {}
);

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/sql",
        destination: "/sql/index.html",
      },
    ];
  },
};

console.log(module.exports);
