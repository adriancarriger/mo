const { getYaml } = require('./utils/files');

getYaml(`${process.cwd()}/mo.yml`)
  .then(({plugins}) => {
    Promise.all(Object.keys(plugins).map(pluginName => {
      const { down } = require(`${process.cwd()}/mo-plugins/${pluginName}/index.js`);
      const pluginConfig = plugins[pluginName];
      return down(pluginConfig, process.cwd());
    }));
  });
