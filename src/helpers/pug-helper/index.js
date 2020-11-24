// eslint-disable-next-line import/no-extraneous-dependencies
const through = require('through2');

module.exports = function(options = {}) {
  return through.obj((file, encoding, callback) => {
    // eslint-disable-next-line no-param-reassign
    file.data = Object.assign({}, file.data || {}, {
      compiler: {
        file: {
          cwd: file.cwd,
          base: file.base,
          path: file.path,
          relative: file.relative,
          dirname: file.dirname,
          stem: file.stem,
          extname: file.extname,
          basename: file.basename,
          symlink: file.symlink,
        },
      },
    });
    callback(null, file);
  });
};
