const { getYaml } = require('./utils/files');

getYaml(`${process.cwd()}/mo.yml`)
  .then(({plugins}) => {
    console.log(plugins);
    Promise.all(Object.keys(plugins).map(pluginName => {
      const { up } = require(`${process.cwd()}/mo-plugins/${pluginName}/index.js`);
      const pluginConfig = plugins[pluginName];
      return up(pluginConfig);
    }));
  });
