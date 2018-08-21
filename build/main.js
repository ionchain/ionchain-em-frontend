require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_http_proxy_json__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_http_proxy_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_http_proxy_json__);
var merge = __webpack_require__(9);
var path = __webpack_require__(7);
// import _ from 'lodash'


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: [
  // '~assets/css/main.css',
  { src: '~less/public.less', lang: 'less' }, { src: '~less/login.less', lang: 'less' }],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
        config = merge(config, {
          resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': resolve('./')
            }
          }
        });
      }
    },

    vendor: ['axios', 'moment']
  },
  plugins: ['~plugins/pretty-checkbox-vue', '~plugins/plugins-other', { src: '~plugins/plugins-client', ssr: false }],
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  /* proxy: {
    '/api': {
      target: 'http://192.168.1.124:3000', 
      ws: false, 
      pathRewrite: {
        '^/api': ''
      }
    }
  } */
  proxy: [['/api', {
    target: 'http://sendrobot.ionchain.org', // api主机
    // pathRewrite: { '/api' : '' }
    cookieDomainRewrite: '',
    onProxyRes: function onProxyRes(proxyRes, req, res) {
      console.log('statusCode', proxyRes.statusCode);
      // console.log('session:', req.ctx.session)


      /* proxyRes.on('data',async (data) => {
        console.log(await getStream(data))
      }) */
      __WEBPACK_IMPORTED_MODULE_0_node_http_proxy_json___default()(res, proxyRes.headers['content-encoding'], function (body) {
        if (body) {
          console.log('body==>', body);
          if (proxyRes.req.path.indexOf('/users/login') > -1 && body.success == 0) {
            console.log('set session @@@@@@@@@@@@');
            req.ctx.session.userinfo = body.data;
            proxyRes.headers['cookie'] = 'JSESSIONID=' + 'xxxxxxxxxxx';
          }
        }
        return body;
      });
    },
    onClose: function onClose(res, socket, head) {
      console.log('onCLose -->', res);
    },

    onProxyReq: function onProxyReq(proxyReq, req, res) {}
  }], ['/mytest', {
    target: 'http://localhost:3000', // api主机
    pathRewrite: { '/mytest': '' }
  }]],
  router: {
    routes: []
    // middleware: 'check-auth'
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa-session");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("webpack-merge");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_workroom2018_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_workroom2018_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_workroom2018_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_workroom2018_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    var app, CONFIG, host, port, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0_E_workroom2018_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();


            app.keys = ['some_secret_hurr'];

            CONFIG = {
              key: 'koa-sess', /** (string) cookie key (default is koa:sess) */
              /** (number || 'session') maxAge in ms (default is 1 days) */
              /** 'session' will result in a cookie that expires when session/browser is closed */
              /** Warning: If a session cookie is stolen, this cookie will never expire */
              maxAge: 86400000,
              overwrite: true, /** (boolean) can overwrite or not (default true) */
              httpOnly: true, /** (boolean) httpOnly or not (default true) */
              signed: true, /** (boolean) signed or not (default true) */
              rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
              renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
            };
            host = process.env.HOST || '127.0.0.1';
            port = process.env.PORT || 2018;

            // Import and Set Nuxt.js options

            config = __webpack_require__(1);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context.next = 12;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context.next = 12;
            return builder.build();

          case 12:

            app.use(session(CONFIG, app)).use(function (ctx) {
              ctx.status = 200;
              ctx.respond = false; // Mark request as handled for Koa
              ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
              nuxt.render(ctx.req, ctx.res);
            });

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var session = __webpack_require__(3);

start();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ },
/* 12 */
/***/ function(module, exports) {

var BufferHelper = function () {
  this.buffers = [];
  this.size = 0;
  Object.defineProperty(this, 'length', {
    get: function () {
      return this.size;
    }
  });
};

BufferHelper.prototype.concat = function (buffer) {
  this.buffers.push(buffer);
  this.size += buffer.length;
  return this;
};

BufferHelper.prototype.empty = function () {
  this.buffers = [];
  this.size = 0;
  return this;
};

BufferHelper.prototype.toBuffer = function () {
  return Buffer.concat(this.buffers, this.size);
};

BufferHelper.prototype.toString = function (encoding) {
  return this.toBuffer().toString(encoding);
};

BufferHelper.prototype.load = function (stream, callback) {
  var that = this;
  stream.on('data', function (trunk) {
    that.concat(trunk);
  });
  stream.on('end', function () {
    callback(null, that.toBuffer());
  });
  stream.once('error', callback);
};

module.exports = BufferHelper;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


const zlib = __webpack_require__(15);
const concatStream = __webpack_require__(14);
const BufferHelper = __webpack_require__(11);

/**
 * Modify the response of json
 * @param res {Response} The http response
 * @param proxyRes {proxyRes|String} String: The http header content-encoding: gzip/deflate
 * @param callback {Function} Custom modified logic
 */
module.exports = function modifyResponse(res, proxyRes, callback) {
  let contentEncoding = proxyRes;
  if (proxyRes && proxyRes.headers) {
    contentEncoding = proxyRes.headers['content-encoding'];
    // Delete the content-length if it exists. Otherwise, an exception will occur
    // @see: https://github.com/langjt/node-http-proxy-json/issues/10
    if ('content-length' in proxyRes.headers) {
      delete proxyRes.headers['content-length'];
    }
  }

  let unzip, zip;
  // Now only deal with the gzip/deflate/undefined content-encoding.
  switch (contentEncoding) {
    case 'gzip':
      unzip = zlib.Gunzip();
      zip = zlib.Gzip();
      break;
    case 'deflate':
      unzip = zlib.Inflate();
      zip = zlib.Deflate();
      break;
  }

  // The cache response method can be called after the modification.
  let _write = res.write;
  let _end = res.end;

  if (unzip) {
    unzip.on('error', function (e) {
      console.log('Unzip error: ', e);
      _end.call(res);
    });
    handleCompressed(res, _write, _end, unzip, zip, callback);
  } else if (!contentEncoding) {
    handleUncompressed(res, _write, _end, callback);
  } else {
    console.log('Not supported content-encoding: ' + contentEncoding);
  }
};

/**
 * handle compressed
 */
function handleCompressed(res, _write, _end, unzip, zip, callback) {
  // The rewrite response method is replaced by unzip stream.
  res.write = data => unzip.write(data);

  res.end = () => unzip.end();

  // Concat the unzip stream.
  let concatWrite = concatStream(data => {
    let body;
    try {
      body = JSON.parse(data.toString());
    } catch (e) {
      body = data.toString();
      console.log('JSON.parse error:', e);
    }

    // Custom modified logic
    if (typeof callback === 'function') {
      body = callback(body);
    }

    let finish = _body => {
      // Converts the JSON to buffer.
      let body = new Buffer(JSON.stringify(_body));

      // Call the response method and recover the content-encoding.
      zip.on('data', chunk => _write.call(res, chunk));
      zip.on('end', () => _end.call(res));

      zip.write(body);
      zip.end();
    };

    if (body && body.then) {
      body.then(finish);
    } else {
      finish(body);
    }
  });

  unzip.pipe(concatWrite);
}

/**
 * handle Uncompressed
 */
function handleUncompressed(res, _write, _end, callback) {
  let buffer = new BufferHelper();
  // Rewrite response method and get the content.
  res.write = data => buffer.concat(data);

  res.end = () => {
    let body;
    try {
      body = JSON.parse(buffer.toBuffer().toString());
    } catch (e) {
      body = buffer.toBuffer().toString();
      console.log('JSON.parse error:', e);
    }

    // Custom modified logic
    if (typeof callback === 'function') {
      body = callback(body);
    }

    let finish = _body => {
      // Converts the JSON to buffer.
      let body = new Buffer(JSON.stringify(_body));

      // Call the response method
      _write.call(res, body);
      _end.call(res);
    };

    if (body && body.then) {
      body.then(finish);
    } else {
      finish(body);
    }
  };
}


/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("concat-stream");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("zlib");

/***/ }
/******/ ]);
//# sourceMappingURL=main.map