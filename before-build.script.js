var fs = require('fs');
var rimraf = require('rimraf');
rimraf('./lib/', fs, function cb() {
  console.log('lib目录已清空');
});
