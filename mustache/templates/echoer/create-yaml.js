const Contracts = require('./contracts');

module.exports = {
  createYaml: (env) => {
    const createEchoerBlock = ({ name, network, startBlocks, address }) => ({
      name,
      network,
      mappingFile: '../src/mapping-echo-account.ts',
      startBlock: startBlocks.prod,
      address: `"${address}"`,
      abi: 'Echoer',
      entities: ['NoteAccount'],
      abis: [
        {
          name: 'Echoer',
          path: '../abis/Echoer.json',
        },
      ],
      events: [
        {
          event: 'Echo(indexed address,bytes)',
          handler: 'handleEcho',
        },
      ],
    });

    return Contracts.map(({ prod, name, network, address }) => {
      const startBlocks = { prod };
      if (network === env) {
        return createEchoerBlock({ name, startBlocks, network, address });
      }
    }).filter((e) => e !== undefined);
  },
};
