const fs = require('fs')
const path = require('path')
const webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');
const paths = require('./paths')

function getEntryFiles(entryPath) {
  const dirs = fs.readdirSync(entryPath, 'utf8');

  return dirs.reduce((result, dir) => {
    dir = path.resolve(entryPath, dir);
    const stat = fs.statSync(dir);

    if (stat.isDirectory()) {
      result = result.concat(getEntryFiles(dir));
    } else {
      if (paths.moduleFileExtensions.includes(path.extname(dir).replace('.', ''))) {
        result.push(dir);
      }
    }

    return result;
  }, []);
}

module.exports = function getEntry(isEnvProduction) {
  return getEntryFiles(paths.appPage).reduce((entryObject, entry) => {
    let relativePath = path.relative(paths.appPage, entry);
    const extname = path.extname(relativePath);
    relativePath = relativePath.slice(0, relativePath.lastIndexOf(extname));
  
    if (isEnvProduction) {
      entryObject[relativePath] = entry;
    } else {
      entryObject[relativePath] = [
        webpackHotDevClient,
        entry,
      ];
    }
  
    return entryObject;
  }, {});
}
