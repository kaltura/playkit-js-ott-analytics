(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("playkit-js"));
	else if(typeof define === 'function' && define.amd)
		define(["playkit-js"], factory);
	else if(typeof exports === 'object')
		exports["PlaykitJsOttAnalytics"] = factory(require("playkit-js"));
	else
		root["PlaykitJsOttAnalytics"] = factory(root["Playkit"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = exports.VERSION = undefined;

var _playkitJs = __webpack_require__(0);

var _ottAnalytics = __webpack_require__(2);

var _ottAnalytics2 = _interopRequireDefault(_ottAnalytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ottAnalytics2.default;
exports.VERSION = "0.0.1";
exports.NAME = "playkit-js-ott-analytics";

/**
 * The plugin name.
 * @type {string}
 * @const
 */

var pluginName = "ottAnalytics";

(0, _playkitJs.registerPlugin)(pluginName, _ottAnalytics2.default);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playkitJs = __webpack_require__(0);

var _playkitBookmarkService = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MEDIA_TYPE = 'MEDIA';
var CONCURRENT = 'Concurrent';
var OttAnalyticsEvent = {
  LOAD: 'LOAD',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  FINISH: 'FINISH',
  FIRST_PLAY: 'FIRST_PLAY',
  BITRATE_CHANGE: 'BITRATE_CHANGE',
  HIT: 'HIT'
};

var OttAnalytics = function (_BasePlugin) {
  _inherits(OttAnalytics, _BasePlugin);

  _createClass(OttAnalytics, null, [{
    key: 'isValid',


    /**
     * Whether the ima plugin is valid.
     * @static
     * @override
     * @public
     */
    value: function isValid() {
      return true;
    }
    /**
     * The default configuration of the plugin.
     * @type {Object}
     * @static
     */

  }]);

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player instance.
   * @param {Object} config - The plugin config.
   */
  function OttAnalytics(name, player, config) {
    _classCallCheck(this, OttAnalytics);

    var _this = _possibleConstructorReturn(this, (OttAnalytics.__proto__ || Object.getPrototypeOf(OttAnalytics)).call(this, name, player, config));

    _this._initializeMembers();
    _this._registerListeners();
    _this._sendAnalytics(OttAnalyticsEvent.LOAD, _this._eventParams);
    return _this;
  }

  /**
   * Destroys the plugin.
   * @override
   * @public
   * @returns {void}
   */


  _createClass(OttAnalytics, [{
    key: 'destroy',
    value: function destroy() {
      this.eventManager.destroy();
    }

    /**
     * Registers the player listeners.
     * @private
     * @returns {void}
     */

  }, {
    key: '_registerListeners',
    value: function _registerListeners() {
      var _this2 = this;

      var PlayerEvent = this.player.Event;
      this.eventManager.listen(this.player, PlayerEvent.FIRST_PLAY, function () {
        return _this2._onFirstPlay();
      });
      this.eventManager.listen(this.player, PlayerEvent.PLAY, function () {
        return _this2._onPlay();
      });
      this.eventManager.listen(this.player, PlayerEvent.PAUSE, function () {
        return _this2._onPause();
      });
      this.eventManager.listen(this.player, PlayerEvent.ENDED, function () {
        return _this2._onEnded();
      });
      this.eventManager.listen(this.player, PlayerEvent.SEEKED, function () {
        return _this2._onSeeked();
      });
      this.eventManager.listen(this.player, PlayerEvent.VIDEO_TRACK_CHANGED, function () {
        return _this2._onVideoTrackChanged();
      });
      this.eventManager.listen(this.player, PlayerEvent.CHANGE_SOURCE_STARTED, function () {
        return _this2._onChangeSourceStarted();
      });
      this.eventManager.listen(this.player, PlayerEvent.SOURCE_SELECTED, function (event) {
        return _this2._onSourceSelected(event);
      });
    }

    /**
     * The source selected event listener.
     * @param {Object} event - The event object.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onSourceSelected',
    value: function _onSourceSelected(event) {
      try {
        var source = event.payload.selectedSource[0];
        var parts = source.id.split(',');
        var id = parts[0];
        this._fileId = parseInt(id);
      } catch (e) {
        this.logger.error(e);
      }
    }

    /**
     * The play event listener.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onPlay',
    value: function _onPlay() {
      this._isPlaying = true;
      this._startMediaHitInterval();
      this._sendAnalytics(OttAnalyticsEvent.PLAY, this._eventParams);
    }

    /**
     * The pause event listener.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onPause',
    value: function _onPause() {
      this._isPlaying = false;
      if (this._didFirstPlay) {
        this._sendAnalytics(OttAnalyticsEvent.PAUSE, this._eventParams);
      }
    }

    /**
     * The ended event listener.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onEnded',
    value: function _onEnded() {
      this._isPlaying = false;
      this._clearMediaHitInterval();
      this._sendAnalytics(OttAnalyticsEvent.FINISH, this._eventParams);
    }

    /**
     * The first play event listener.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onFirstPlay',
    value: function _onFirstPlay() {
      this._didFirstPlay = true;
      this._sendAnalytics(OttAnalyticsEvent.FIRST_PLAY, this._eventParams);
    }

    /**
     * Sets _playFromContinue to false on seeked event.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onSeeked',
    value: function _onSeeked() {
      this._playFromContinue = false;
    }

    /**
     * Send BITRATE_CHANGE analytic.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onVideoTrackChanged',
    value: function _onVideoTrackChanged() {
      this._sendAnalytics(OttAnalyticsEvent.BITRATE_CHANGE, this._eventParams);
    }

    /**
     * Sets _didFirstPlay to false on media change.
     * @private
     * @returns {void}
     */

  }, {
    key: '_onChangeSourceStarted',
    value: function _onChangeSourceStarted() {
      this._didFirstPlay = false;
    }

    /**
     * Get the player params which relevant to analytics request.
     * @private
     * @returns {Object} - The player params
     */

  }, {
    key: '_sendAnalytics',


    /**
     * Send analytics.
     * @param {string} action - The action
     * @param {string} params - The params
     * @private
     * @returns {void}
     */
    value: function _sendAnalytics(action, params) {
      var _this3 = this;

      var playerData = {
        action: action,
        averageBitrate: 0, totalBitrate: 0,
        currentBitrate: 0, fileId: params.fileId
      };
      var bookMark = {
        type: params.mediaType,
        id: params.mediaId,
        position: params.position,
        playerData: playerData
      };
      var request = _playkitBookmarkService.OTTBookmarkService.add(this.config.serviceUrl, this.config.ks, bookMark);
      request.doHttpRequest().then(function (data) {
        if (data === CONCURRENT) {
          _this3._concurrentFlag = true;
        } else {
          _this3.logger.debug('Analytics event sent', bookMark);
        }
      }, function (err) {
        _this3.logger.error('Failed to send analytics event', bookMark, err);
      });
    }

    /**
     * Starts the media hit interval.
     * @private
     * @returns {void}
     */

  }, {
    key: '_startMediaHitInterval',
    value: function _startMediaHitInterval() {
      var _this4 = this;

      this._clearMediaHitInterval();
      this._mediaHitInterval = setInterval(function () {
        if (_this4._isPlaying) {
          _this4._playFromContinue = false;
          if (_this4._concurrentFlag || _this4._eventParams.position === 0) {
            return;
          } else {
            _this4._sendAnalytics(OttAnalyticsEvent.HIT, _this4._eventParams);
          }
        }
      }, this.config.mediaHitInterval * 1000);
    }

    /**
     * Clears the media hit interval.
     * @private
     * @returns {void}
     */

  }, {
    key: '_clearMediaHitInterval',
    value: function _clearMediaHitInterval() {
      clearInterval(this._mediaHitInterval);
      this._mediaHitInterval = 0;
    }

    /**
     * Initializes the class members.
     * @private
     * @returns {void}
     */

  }, {
    key: '_initializeMembers',
    value: function _initializeMembers() {
      this._isPlaying = false;
      this._concurrentFlag = false;
      this._fileId = 0;
      this._didFirstPlay = false;
      this._mediaHitInterval = 0;
      this._isPlaying = false;
      if (this.config.startTime) {
        this._continueTime = this.config.startTime;
        this._playFromContinue = true;
      } else {
        this._continueTime = 0;
        this._playFromContinue = false;
      }
    }
  }, {
    key: '_eventParams',
    get: function get() {
      return {
        mediaType: MEDIA_TYPE,
        fileId: this._fileId,
        mediaId: this.config.entryId,
        position: this.player.currentTime
      };
    }
  }]);

  return OttAnalytics;
}(_playkitJs.BasePlugin);

OttAnalytics.defaultConfig = {
  serviceUrl: 'http://api-preprod.ott.kaltura.com/v4_6/api_v3',
  mediaHitInterval: 30,
  startTime: null
};
exports.default = OttAnalytics;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.PlaykitJsProviders = t() : e.PlaykitJsProviders = t();
}(undefined, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;var o = n[r] = { i: r, l: !1, exports: {} };return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }var n = {};return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 44);
  }({ 0: function _(e, t, n) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }Object.defineProperty(t, "__esModule", { value: !0 });var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          i = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          a = function () {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Map();r(this, e), this.headers = t;
        }return i(e, [{ key: "getUrl", value: function value(e) {
            return e + "/service/" + this.service + (this.action ? "/action/" + this.action : "");
          } }, { key: "doHttpRequest", value: function value() {
            var e = this;if (!this.url) throw new Error("serviceUrl is mandatory for request builder");var t = new XMLHttpRequest();return new Promise(function (n, r) {
              t.onreadystatechange = function () {
                if (4 === t.readyState) if (200 === t.status) {
                  var e = JSON.parse(t.responseText);e && "object" === (void 0 === e ? "undefined" : o(e)) && e.code && e.message ? r(e) : n(e);
                } else r(t.responseText);
              }, t.open(e.method, e.url), e.headers.forEach(function (e, n) {
                t.setRequestHeader(n, e);
              }), t.send(e.params);
            });
          } }]), e;
      }();t.default = a;
    }, 1: function _(e, t, n) {
      "use strict";
      function r(e) {
        return e ? u.get(e) : u;
      }function o(e) {
        return r(e).getLevel();
      }function i(e, t) {
        r(t).setLevel(e);
      }Object.defineProperty(t, "__esModule", { value: !0 }), t.setLogLevel = t.getLogLevel = t.LogLevel = void 0;var a = n(12),
          u = function (e) {
        if (e && e.__esModule) return e;var t = {};if (null != e) for (var n in e) {
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        }return t.default = e, t;
      }(a),
          l = { DEBUG: u.DEBUG, INFO: u.INFO, TIME: u.TIME, WARN: u.WARN, ERROR: u.ERROR, OFF: u.OFF };u.useDefaults({ defaultLevel: u.ERROR }), t.default = r, t.LogLevel = l, t.getLogLevel = o, t.setLogLevel = i;
    }, 11: function _(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });var r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return typeof e === "undefined" ? "undefined" : _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
      },
          o = function e(t) {
        var n = void 0;return Array.isArray(t) ? (n = t.length > 0 ? t.slice(0) : [], n.forEach(function (t, o) {
          ("object" === (void 0 === t ? "undefined" : r(t)) && t !== {} || Array.isArray(t) && t.length > 0) && (n[o] = e(t));
        })) : "object" === (void 0 === t ? "undefined" : r(t)) ? (n = Object.assign({}, t), Object.keys(n).forEach(function (t) {
          ("object" === r(n[t]) && n[t] !== {} || Array.isArray(n[t]) && n[t].length > 0) && (n[t] = e(n[t]));
        })) : n = t, n;
      };t.clone = o;
    }, 12: function _(e, t, n) {
      var r, o; /*!
                * js-logger - http://github.com/jonnyreeves/js-logger
                * Jonny Reeves, http://jonnyreeves.co.uk/
                * js-logger may be freely distributed under the MIT license.
                */
      !function (i) {
        "use strict";
        var a = {};a.VERSION = "1.4.1";var u,
            l = {},
            s = function s(e, t) {
          return function () {
            return t.apply(e, arguments);
          };
        },
            c = function c() {
          var e,
              t,
              n = arguments,
              r = n[0];for (t = 1; t < n.length; t++) {
            for (e in n[t]) {
              e in r || !n[t].hasOwnProperty(e) || (r[e] = n[t][e]);
            }
          }return r;
        },
            f = function f(e, t) {
          return { value: e, name: t };
        };a.DEBUG = f(1, "DEBUG"), a.INFO = f(2, "INFO"), a.TIME = f(3, "TIME"), a.WARN = f(4, "WARN"), a.ERROR = f(8, "ERROR"), a.OFF = f(99, "OFF");var p = function p(e) {
          this.context = e, this.setLevel(e.filterLevel), this.log = this.info;
        };p.prototype = { setLevel: function setLevel(e) {
            e && "value" in e && (this.context.filterLevel = e);
          }, getLevel: function getLevel() {
            return this.context.filterLevel;
          }, enabledFor: function enabledFor(e) {
            var t = this.context.filterLevel;return e.value >= t.value;
          }, debug: function debug() {
            this.invoke(a.DEBUG, arguments);
          }, info: function info() {
            this.invoke(a.INFO, arguments);
          }, warn: function warn() {
            this.invoke(a.WARN, arguments);
          }, error: function error() {
            this.invoke(a.ERROR, arguments);
          }, time: function time(e) {
            "string" == typeof e && e.length > 0 && this.invoke(a.TIME, [e, "start"]);
          }, timeEnd: function timeEnd(e) {
            "string" == typeof e && e.length > 0 && this.invoke(a.TIME, [e, "end"]);
          }, invoke: function invoke(e, t) {
            u && this.enabledFor(e) && u(t, c({ level: e }, this.context));
          } };var v = new p({ filterLevel: a.OFF });!function () {
          var e = a;e.enabledFor = s(v, v.enabledFor), e.debug = s(v, v.debug), e.time = s(v, v.time), e.timeEnd = s(v, v.timeEnd), e.info = s(v, v.info), e.warn = s(v, v.warn), e.error = s(v, v.error), e.log = e.info;
        }(), a.setHandler = function (e) {
          u = e;
        }, a.setLevel = function (e) {
          v.setLevel(e);for (var t in l) {
            l.hasOwnProperty(t) && l[t].setLevel(e);
          }
        }, a.getLevel = function () {
          return v.getLevel();
        }, a.get = function (e) {
          return l[e] || (l[e] = new p(c({ name: e }, v.context)));
        }, a.createDefaultHandler = function (e) {
          e = e || {}, e.formatter = e.formatter || function (e, t) {
            t.name && e.unshift("[" + t.name + "]");
          };var t = {},
              n = function n(e, t) {
            Function.prototype.apply.call(e, console, t);
          };return "undefined" == typeof console ? function () {} : function (r, o) {
            r = Array.prototype.slice.call(r);var i,
                u = console.log;o.level === a.TIME ? (i = (o.name ? "[" + o.name + "] " : "") + r[0], "start" === r[1] ? console.time ? console.time(i) : t[i] = new Date().getTime() : console.timeEnd ? console.timeEnd(i) : n(u, [i + ": " + (new Date().getTime() - t[i]) + "ms"])) : (o.level === a.WARN && console.warn ? u = console.warn : o.level === a.ERROR && console.error ? u = console.error : o.level === a.INFO && console.info ? u = console.info : o.level === a.DEBUG && console.debug && (u = console.debug), e.formatter(r, o), n(u, r));
          };
        }, a.useDefaults = function (e) {
          a.setLevel(e && e.defaultLevel || a.DEBUG), a.setHandler(a.createDefaultHandler(e));
        }, r = a, void 0 !== (o = "function" == typeof r ? r.call(t, n, t, e) : r) && (e.exports = o);
      }();
    }, 2: function _(e, t, n) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }Object.defineProperty(t, "__esModule", { value: !0 });var o = function e(t) {
        r(this, e), this.hasError = !1, "KalturaAPIException" === t.objectType ? (this.hasError = !0, this.error = new i(t.code, t.message)) : this.data = t;
      };t.default = o;var i = function e(t, n) {
        r(this, e), this.code = t, this.message = n;
      };
    }, 20: function _(e, t, n) {
      "use strict";
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          a = n(5),
          u = r(a),
          l = n(6),
          s = r(l),
          c = s.default.get(),
          f = function () {
        function e() {
          o(this, e);
        }return i(e, null, [{ key: "getMultiRequest", value: function value(e, t) {
            var n = c.serviceParams;e && Object.assign(n, { ks: e }), t && Object.assign(n, { partnerId: t });var r = new Map();r.set("Content-Type", "application/json");var o = new u.default(r);return o.method = "POST", o.service = "multirequest", o.url = o.getUrl(c.serviceUrl), o.params = n, o;
          } }]), e;
      }();t.default = f;
    }, 35: function _(e, t, n) {
      "use strict";
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
      }function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }Object.defineProperty(t, "__esModule", { value: !0 });var u = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          l = n(20),
          s = r(l),
          c = n(0),
          f = r(c),
          p = n(6),
          v = r(p),
          d = function (e) {
        function t() {
          return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
        }return a(t, e), u(t, null, [{ key: "add", value: function value(e, t, n) {
            var r = new Map();r.set("Content-Type", "application/json");var o = new f.default(r);o.service = "bookmark", o.action = "add", o.method = "POST", o.url = o.getUrl(e);var i = { objectType: "KalturaBookmarkPlayerData", action: n.playerData.action, averageBitrate: n.playerData.averageBitrate, totalBitrate: n.playerData.totalBitrate, currentBitrate: n.playerData.currentBitrate, fileId: n.playerData.fileId },
                a = { objectType: "KalturaBookmark", type: n.type, id: n.id, position: n.position, playerData: i },
                u = v.default.get(),
                l = u.serviceParams;return Object.assign(l, { bookmark: a, ks: t }), o.params = JSON.stringify(l), o;
          } }]), t;
      }(s.default);t.default = d;
    }, 44: function _(e, t, n) {
      "use strict";
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }Object.defineProperty(t, "__esModule", { value: !0 }), t.VERSION = t.NAME = t.RequestBuilder = t.OTTConfiguration = t.OTTBookmarkService = void 0;var o = n(0),
          i = r(o),
          a = n(6),
          u = r(a),
          l = n(35),
          s = r(l);t.OTTBookmarkService = s.default, t.OTTConfiguration = u.default, t.RequestBuilder = i.default, t.NAME = "playkit-js-providers-bookmark-service", t.VERSION = "1.5.0";
    }, 5: function _(e, t, n) {
      "use strict";
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }function o(e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
      }function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
      }function u(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }Object.defineProperty(t, "__esModule", { value: !0 }), t.MultiRequestResult = void 0;var l = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          s = n(0),
          c = r(s),
          f = n(1),
          p = r(f),
          v = n(2),
          d = r(v),
          y = function (e) {
        function t() {
          var e, n, r, o;i(this, t);for (var u = arguments.length, l = Array(u), s = 0; s < u; s++) {
            l[s] = arguments[s];
          }return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), r.requests = [], o = n, a(r, o);
        }return u(t, e), l(t, [{ key: "add", value: function value(e) {
            this.requests.push(e);var t = {},
                n = { service: e.service, action: e.action };return Object.assign(t, o({}, this.requests.length, Object.assign(n, e.params))), Object.assign(t, this.params), this.params = t, this;
          } }, { key: "execute", value: function value() {
            var e = this;try {
              this.params = JSON.stringify(this.params);
            } catch (e) {
              t._logger.error("" + e.message);
            }return new Promise(function (t, n) {
              e.doHttpRequest().then(function (e) {
                t(new b(e));
              }, function (e) {
                n("Error on multiRequest execution, error <" + e + ">.");
              });
            });
          } }]), t;
      }(c.default);y._logger = (0, p.default)("MultiRequestBuilder"), t.default = y;var b = t.MultiRequestResult = function e(t) {
        var n = this;i(this, e), this.results = [], this.success = !0, (t.result ? t.result : t).forEach(function (t) {
          var r = new d.default(t);if (n.results.push(r), r.hasError) return e._logger.error("Service returned an error with error code: " + r.error.code + " and message: " + r.error.message + "."), void (n.success = !1);
        });
      };b._logger = (0, p.default)("MultiRequestResult");
    }, 6: function _(e, t, n) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }Object.defineProperty(t, "__esModule", { value: !0 }), t.OTTConfiguration = void 0;var o = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }(),
          i = n(11),
          a = { serviceUrl: "//api-preprod.ott.kaltura.com/v4_6/api_v3", cdnUrl: "//api-preprod.ott.kaltura.com/v4_6", serviceParams: { apiVersion: "4.5.4.15337" } },
          u = function () {
        function e() {
          r(this, e);
        }return o(e, null, [{ key: "set", value: function value(e) {
            e && Object.assign(a, e);
          } }, { key: "get", value: function value() {
            return (0, i.clone)(a);
          } }]), e;
      }();t.default = u, t.OTTConfiguration = u;
    } });
});
//# sourceMappingURL=playkit-bookmark-service.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-ott-analytics.js.map