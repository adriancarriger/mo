const path = require('path');
const fs = require('fs-extra');

const { getYaml } = require('./utils/files');

const tempDir = path.normalize(`${process.cwd()}/.mo-temp`);

fs.copy(`${process.cwd()}/mo-dist`, tempDir, { overwrite: true })
  .then(() => getYaml(`${process.cwd()}/mo.yml`))
  .then(({plugins}) => {
    return Promise.all(Object.keys(plugins).map(pluginName => {
      const { up } = require(`${process.cwd()}/mo-plugins/${pluginName}/index.js`);
      const pluginConfig = plugins[pluginName];
      return up(pluginConfig, tempDir);
    }));
  })
  .then(() => fs.move(tempDir, `${process.cwd()}/mo-src`, { overwrite: true }));
