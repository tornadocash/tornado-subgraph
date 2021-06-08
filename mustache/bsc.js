
module.exports = {
  base: {
    specVersion: '0.0.2',
    description: '',
    repository: 'https://github.com/tornadocash/bsc-tornado-subgraph',
    network: 'bsc',
  },
  dataSources: [
    {
      name: 'Instance',
      network: 'bsc',
      dataSourceKind: 'ethereum/contract',
      address: "0x5D595DB16eb6d074E0e7E7f0bE37E7e75f23BEc7",
      abi: 'Instance',
      startBlock: 7941563,
      mapping: {
        kind: 'ethereum/events',
        apiVersion: '0.0.4',
        language: 'wasm/assemblyscript',
        entities: ['Deposit', 'Withdrawal'],
        abis: {
          name: 'Instance',
          file: './abis/Instance.json',
        },
        eventHandlers: [
          {
            event: 'Deposit(indexed bytes32,uint32,uint256)',
            handler: 'handleDeposit',
          },
          {
            event: 'Withdrawal(address,bytes32,indexed address,uint256)',
            handler: 'handleWithdrawal',
          }
        ],
        file: './src/mapping-proxy.ts',
      }
    },
    {
      name: 'Echoer',
      network: 'bsc',
      dataSourceKind: 'ethereum/contract',
      address: "0x60eaCBd5535ADB86955A0154E44Aded78F161643",
      abi: 'Echoer',
      startBlock: 7941563,
      mapping: {
        kind: 'ethereum/events',
        apiVersion: '0.0.4',
        language: 'wasm/assemblyscript',
        entities: ['NoteAccount'],
        abis: {
          name: 'Echoer',
          file: './abis/Echoer.json',
        },
        eventHandlers: [
          {
            event: 'Echo(indexed address,bytes)',
            handler: 'handleEcho',
          },
        ],
        file: './src/mapping-echo-account.ts',
      }
    },
    {
      name: 'Proxy',
      dataSourceKind: 'ethereum/contract',
      address: "0x0Ce22770451A8acAD1220D9d1678656b4fAe4a1d",
      abi: 'Proxy',
      startBlock: 7941563,
      mapping: {
        kind: 'ethereum/events',
        apiVersion: '0.0.4',
        language: 'wasm/assemblyscript',
        entities: ['EncryptedNote'],
        abis: {
          name: 'Proxy',
          file: './abis/Proxy.json',
        },
        eventHandlers: [
          {
            event: 'EncryptedNote(indexed address,bytes)',
            handler: 'handleEncryptedNote',
          },
        ],
        file: './src/mapping-encrypted-note.ts',
      }
    },
  ],
};
