const Path = require('path');

/**
 * @desc return absolute path from root
 * @param {String} path - path from root
 * @return {String} - absolute path
 */
const path_root = function(path = '') {
  return Path.resolve(__dirname, '../') + '/' + path
}

module.exports = path_root