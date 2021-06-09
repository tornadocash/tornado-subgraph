'use strict';

const path = require('path');
const program = require('commander');

program
  .command('create-yaml')
  .description('Creates yaml files using the mustache templating engine')
  .option(
    '-s, --subgraph <value>',
    'the subgraph for which you are creating the yaml file. Currently only "proxy", "instance" and "echoer" are supported',
  )
  .option(
    '-e, --env <value>',
    'defaults to "prod" and uses the prod start blocks config. Must set to "test" to use test start blocks config',
    'prod',
  )
  .action(async ({ subgraph, env }) => {
    const baseIndexPath = path.join(__dirname, 'mustache', 'templates', 'base', 'index.js');
    const specificIndexPath = path.join(__dirname, 'mustache', 'templates', subgraph, 'index.js');
    const dataSourcesPath = path.join(__dirname, 'mustache', 'templates', subgraph, 'create-yaml.js');

    const subgraphDataSourcesData = require(dataSourcesPath);
    const dataSourcesData = [
      ...subgraphDataSourcesData.createYaml(env),
    ];

    const indexData = require(baseIndexPath);

    const specificIndexData = require(specificIndexPath);

    indexData.yaml[0] = { ...indexData.yaml[0], ...specificIndexData };
    indexData.yaml[0].dataSources = dataSourcesData;

    return console.log(JSON.stringify(indexData, null, 2) + '\n');
  });

program.parse(process.argv);
