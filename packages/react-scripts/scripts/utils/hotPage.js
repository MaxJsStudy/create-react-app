const path = require('path')
const chokidar = require('chokidar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const paths = require('../../config/paths');
const {moduleFileExtensions} = paths
const webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');
const pattern = `src/page/**/*.{${moduleFileExtensions.join(',')}}`;
const debounce = require('lodash/debounce');
const cwd = process.cwd();

module.exports = function hotPage({devServer, compiler, initialEntries}) {
  const watcher = chokidar.watch(pattern, {
    cwd,
  });
  const _refresh = debounce((path, type) => refresh(path, type), 300)

  watcher
    .on('add', path => _refresh(path, 'add'))
    // .on('unlink', path => _refresh(path, 'unlink'))
  devServer.contentBaseWatchers.push(watcher)
  
  function refresh(filepath, type) {
    filepath = path.resolve(cwd, filepath);
    let relativePath = path.relative(paths.appPage, filepath);
    const extname = path.extname(relativePath);
    relativePath = relativePath.slice(0, relativePath.lastIndexOf(extname));

    if (type === 'add' && !initialEntries.includes(relativePath)) {
      new MultiEntryPlugin(null, [
        webpackHotDevClient,
        filepath
      ], relativePath).apply(compiler)
      
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        filename: `${relativePath}.html`,
        chunks: [relativePath],
      }).apply(compiler)
      
      devServer.invalidate()
      initialEntries.push(relativePath)
    }
  } 
}
