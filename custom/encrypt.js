// Encrypts contents of all files using aes-256-cbc

var crypto = require("crypto");

function encrypt(buffer, password) {
  var cipher = crypto.createCipher("aes-256-cbc", password);
  var crypted = cipher.update(buffer, "utf8", "hex");
  crypted += cipher.final("hex");
  return new Buffer(crypted);
}

module.exports = function() {
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(fname) {
      var file = files[fname];
      file.contents = encrypt(file.contents, metalsmith._metadata.password);
    });
  };
};
