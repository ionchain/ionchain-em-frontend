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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var merge = __webpack_require__(11);
var path = __webpack_require__(9);
// import _ from 'lodash'
// import modifyResponse from 'node-http-proxy-json'

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
  modules: [],
  router: {
    routes: [],
    middleware: 'auth-router'
  },
  serverMiddleware: ['~/middleware/server-middleware']
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("axios");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("koa-body");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("koa-session");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("webpack-merge");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
    var _this = this;

    var app, CONFIG, host, port, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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

            config = __webpack_require__(0);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context3.next = 12;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context3.next = 12;
            return builder.build();

          case 12:

            router.get('/logout', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        ctx.session = null;
                        ctx.body = {
                          message: '退出成功',
                          success: 0
                        };

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            router.all(/^\/api/, function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
                var url, custormHeaders, headersProps, target, options;
                return __WEBPACK_IMPORTED_MODULE_0_D_LiQiong_Prpject_3_ionchain_em_frontend_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        url = '';
                        custormHeaders = {};
                        headersProps = ['token'];
                        target = 'http://sendrobot.ionchain.org';
                        // var target = 'http://ionc_stoer.ionchain.org:8001'

                        headersProps.forEach(function (item) {
                          if (ctx.req.headers.hasOwnProperty(item)) {
                            custormHeaders[item] = ctx.req.headers.token;
                          }
                        });

                        url = target + ctx.request.url;
                        console.log('proxy url @@', url, ctx.request.body);

                        options = {
                          url: url,
                          method: ctx.req.method,
                          headers: Object.assign({
                            cookie: ctx.req.headers.cookie ? ctx.req.headers.cookie : '',
                            'content-type': ctx.req.headers['content-type'],
                            'connection': ctx.req.headers['connection']
                          }, custormHeaders),
                          params: ctx.request.params,
                          data: ctx.request.body
                        };
                        _context2.next = 10;
                        return axios(options).then(function (res) {
                          if (res.headers.hasOwnProperty('set-cookie')) {
                            ctx.response.set({ 'set-cookie': res.headers['set-cookie'] });
                          }
                          for (var prop in custormHeaders) {
                            if (res.headers.hasOwnProperty(prop)) {
                              ctx.response.set(_defineProperty({}, prop, res.headers[prop]));
                            }
                          }
                          ctx.response.set({ 'content-type': res.headers['content-type'] });
                          ctx.body = res.data;
                          if (ctx.request.url.indexOf('/users/login' > -1 && ctx.body.success === 0)) {
                            ctx.session.userinfo = res.data.data;
                          }
                        }).catch(function (err) {
                          console.log('err===>', err);
                          ctx.body = err.response.statusText;
                          ctx.status = err.response.status;
                        }).then(function () {});

                      case 10:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }());

            app.use(koaBody()).use(session(CONFIG, app)).use(router.routes())
            // .use(router.allowedMethods())
            .use(function (ctx) {
              ctx.status = 200;
              ctx.respond = false; // Mark request as handled for Koa
              ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
              nuxt.render(ctx.req, ctx.res);
            }).listen(port, host);

            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var session = __webpack_require__(7);
var Router = __webpack_require__(6);
var router = new Router();
var proxy = __webpack_require__(3);
var axios = __webpack_require__(2);
var koaBody = __webpack_require__(5);

start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map