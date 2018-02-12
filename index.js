var Metalsmith = require("metalsmith");
var layouts = require("metalsmith-layouts");
var permalinks = require("metalsmith-permalinks");
var collections = require("metalsmith-collections");
var webpack = require("metalsmith-webpack-2").default;
var discoverHelpers = require("metalsmith-discover-helpers");
var discoverPartials = require("metalsmith-discover-partials");
var watch = require("metalsmith-watch");
var serve = require("metalsmith-serve");
var markdown = require("./custom/markdown");
var abspermalink = require("./custom/abspermalink");
var encrypt = require("./custom/encrypt");
var webpackConfig = require("./webpack.config.js");

var isDev = process.env.NODE_ENV !== "production";

Metalsmith(__dirname)
  .metadata({
    title: "Research Blog",
    description: "Blog for updating research advisor with progress.",
    generator: "Metalsmith",
    url: isDev ? "http://localhost:8080/" : process.env.PUBLIC_URL,
    password: isDev ? "password" : process.env.PASSWORD,
    watch: isDev
  })
  .source("./src")
  .destination("./build")
  .clean(false)
  .use(
    discoverPartials({
      directory: "partials",
      pattern: /\.hbs$/
    })
  )
  .use(
    discoverHelpers({
      directory: "helpers",
      pattern: /\.js$/
    })
  )
  .use(
    collections({
      posts: {
        pattern: "posts/*.md",
        sortBy: "date",
        reverse: true
      }
    })
  )
  .use(markdown())
  .use(
    permalinks({
      pattern: ":title"
    })
  )
  .use(abspermalink())
  .use(encrypt())
  .use(
    layouts({
      engine: "handlebars",
      default: "post.hbs"
    })
  )
  .use(webpack(webpackConfig))
  .use(
    isDev &&
      watch({
        paths: {
          "${source}/**/*": true,
          "layouts/**/*": "**/*.md"
        },
        livereload: true
      })
  )
  .use(isDev && serve())
  .build(function(err, files) {
    if (err) {
      throw err;
    }
  });
