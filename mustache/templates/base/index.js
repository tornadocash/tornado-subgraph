module.exports = {
  yaml: [
    {
      specVersion: '0.0.2',
      repository: 'https://github.com/Synthetixio/synthetix-subgraph',
      dataSourceKind: 'ethereum/contract',
      network: 'mainnet',
      mapping: {
        kind: 'ethereum/events',
        version: '0.0.4',
        language: 'wasm/assemblyscript',
      },
    },
  ],
};
