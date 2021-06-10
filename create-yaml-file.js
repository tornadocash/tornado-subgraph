'use strict';

const path = require('path');
const program = require('commander');

program
  .command('create-yaml')
  .description('Creates yaml files using the mustache templating engine')
  .option(
    '-e, --env <value>',
    'defaults to "bsc" and uses the bsc start blocks config. Must set to "goerli" to use test start blocks config',
    'bsc',
  )
  .action(async ({ env }) => {
    const baseIndexPath = path.join(__dirname, 'mustache', 'templates', 'base', 'index.js');

    const echoerIndexPath = path.join(__dirname, 'mustache', 'templates', 'echoer', 'index.js');
    const dataEchoerSourcesPath = path.join(__dirname, 'mustache', 'templates', 'echoer', 'create-yaml.js');

    const instancesIndexPath = path.join(__dirname, 'mustache', 'templates', 'instance', 'index.js');
    const dataInstancesSourcesPath = path.join(__dirname, 'mustache', 'templates', 'instance', 'create-yaml.js');

    const proxyIndexPath = path.join(__dirname, 'mustache', 'templates', 'proxy', 'index.js');
    const dataProxySourcesPath = path.join(__dirname, 'mustache', 'templates', 'proxy', 'create-yaml.js');

    const echoerDataSourcesData = require(dataEchoerSourcesPath);
    const instancesDataSourcesData = require(dataInstancesSourcesPath);
    const proxyDataSourcesData = require(dataProxySourcesPath);

    const dataSourcesData = [
      ...echoerDataSourcesData.createYaml(env),
      ...instancesDataSourcesData.createYaml(env),
      ...proxyDataSourcesData.createYaml(env),
    ];

    const indexData = require(baseIndexPath);

    const specificEchoerIndexData = require(echoerIndexPath);
    const specificInstancesIndexData = require(instancesIndexPath);
    const specificProxyIndexData = require(proxyIndexPath);

    indexData.yaml[0] = {
      ...indexData.yaml[0],
      ...specificEchoerIndexData,
      ...specificInstancesIndexData,
      ...specificProxyIndexData,
    };
    indexData.yaml[0].dataSources = dataSourcesData;

    return console.log(JSON.stringify(indexData, null, 2) + '\n');
  });

program.parse(process.argv);
