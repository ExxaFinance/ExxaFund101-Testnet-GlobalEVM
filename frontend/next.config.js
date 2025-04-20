// next.config.js

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_INFURA_URL: process.env.NEXT_PUBLIC_INFURA_URL,
    NEXT_PUBLIC_ALCHEMY_URL: process.env.NEXT_PUBLIC_ALCHEMY_URL,
    NEXT_PUBLIC_CHAINLINK_ORACLE_URL: process.env.NEXT_PUBLIC_CHAINLINK_ORACLE_URL,
  },
  webpack(config) {
    // Supporte l'importation de fichiers JSON (par exemple, ABI)
    config.module.rules.push({
      test: /\.json$/,
      loader: 'json-loader',
      type: 'javascript/auto',
    });
    return config;
  },
};
