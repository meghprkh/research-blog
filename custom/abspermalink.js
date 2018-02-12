// Makes all permalinks absolute so that can easily host site on a subpath

module.exports = function() {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(fname) {
      var file = files[fname];
      file.path = file.path && metalsmith._metadata.url + file.path;
    });
  };
};
