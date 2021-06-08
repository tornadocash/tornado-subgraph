const createStartBlock = (blocks, env) => {
  if (env === 'test') {
    return blocks.exchanger
        ? blocks.exchanger.test
          ? blocks.exchanger.test
          : blocks.exchanger.prod
        : blocks.test || blocks.prod
  } else if (env === 'prod') {
    return blocks.exchanger && blocks.exchanger.prod ? blocks.exchanger.prod : blocks.prod
  } else {
    throw new Error('Invalid env for creating a yaml file')
  }
}

module.exports = {
  createStartBlock,
}
