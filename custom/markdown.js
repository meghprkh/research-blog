// Modified from metalsmith-markdown to use markdown-it with addons

var basename = require("path").basename;
var debug = require("debug")("metalsmith-markdown");
var dirname = require("path").dirname;
var extname = require("path").extname;
var MarkdownIt = require("markdown-it");
var MarkdownItKatex = require("markdown-it-katex");

var md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
md.use(MarkdownItKatex);

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options) {
  options = options || {};
  var keys = options.keys || [];

  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
      debug("checking file: %s", file);
      if (!markdown(file)) return;
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + ".html";
      var str = md.render(data.contents.toString());
      data.contents = new Buffer(str);
      if ("." != dir) html = dir + "/" + html;

      debug("converting file: %s", file);

      delete files[file];
      files[html] = data;
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file) {
  return /\.md|\.markdown/.test(extname(file));
}
