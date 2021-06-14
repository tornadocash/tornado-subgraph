const Contracts = require('./contracts');

module.exports = {
  createYaml: (env) => {
    const createProxyBlock = ({ name, network, startBlocks, address }) => ({
      name,
      network,
      mappingFile: '../src/mapping-encrypted-note.ts',
      abi: 'Proxy',
      startBlock: startBlocks.prod,
      address: `"${address}"`,
      entities: ['EncryptedNote'],
      abis: [
        {
          event: 'Proxy',
          path: '../abis/Proxy.json',
        },
      ],
      events: [
        {
          event: 'EncryptedNote(indexed address,bytes)',
          handler: 'handleEncryptedNote',
        },
      ],
    });

    return Contracts.map(({ prod, name, network, address }) => {
      const startBlocks = { prod };
      if (network === env) {
        return createProxyBlock({ name, startBlocks, network, address });
      }
    }).filter((e) => e !== undefined);
  },
};
