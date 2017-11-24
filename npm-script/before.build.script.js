var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
rimraf(path.resolve(__dirname, '../lib/'), fs, function cb() {
  console.log('lib目录已清空');
});
