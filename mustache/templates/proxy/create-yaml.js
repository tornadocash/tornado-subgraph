const Contracts = require('./contracts');

module.exports = {
  createYaml: (env) => {

    const createProxyBlock = ({ name, address }) => ({
      name,
      mappingFile: '../src/mapping-encrypted-note.ts',
      abi: 'Proxy',
      startBlock: 7941563,
      address,
      entities: ['EncryptedNote'],
      abis: [
        {
          event: 'Proxy',
          path: '../abis/Proxy.json'
        }
      ],
      events: [
        {
          event: 'EncryptedNote(indexed address,bytes)',
          handler: 'handleEncryptedNote',
        }
      ],
    });

    return Contracts.map(({ prod, name, address }) => {
      const startBlocks = { prod };

      return createProxyBlock({ name, startBlocks, address })
    });
  },
};
