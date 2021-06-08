const fs = require('fs');
const path = require('path');

const Contracts = require('./contracts');
const { createStartBlock } = require('../common');

module.exports = {
  createYaml: (env) => {

    const createProxyBlock = ({ name, startBlocks, address }) => ({
      name,
      mappingFile: '../src/mapping-encrypted-note.ts',
      startBlock: createStartBlock(startBlocks, env),
      address,
      entities: ['EncryptedNote'],
      abis: [
        {
          event: 'Proxy',
          file: '../abis/Proxy.json'
        }
      ],
      events: [
        {
          event: 'EncryptedNote(indexed address,bytes)',
          handler: 'handleEncryptedNote',
        }
      ],
    });

    return Contracts.map(({ type, prod, test, name, address }) => {
      const startBlocks = { prod, test };

      return createProxyBlock({ name, startBlocks, address })
    });
  },
};
