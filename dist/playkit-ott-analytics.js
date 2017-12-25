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

var _bookmarkService = __webpack_require__(3);

var _bookmarkService2 = _interopRequireDefault(_bookmarkService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var request = _bookmarkService2.default.add(this.config.serviceUrl, this.config.ks, bookMark); //StatsService.collect(this.config.playerVersion, this._ks, {"event": statsEvent}, this.config.baseUrl);
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

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PlaykitJsProviders"] = factory();
	else
		root["PlaykitJsProviders"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Request builder
 * @classdesc
 */
var RequestBuilder = function () {

  /**
   * @constructor
   * @param {Map<string, string>} headers The request headers
   */

  /**
   * @member - Service method (POST,GET,DELETE etc..)
   * @type {string}
   */

  /**
   * @member - Service headers
   * @type {Map<string, string>}
   */

  /**
   * @member - Service action
   * @type {string}
   */
  function RequestBuilder() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

    _classCallCheck(this, RequestBuilder);

    this.headers = headers;
  }

  /**
   * Builds restful service URL
   * @function getUrl
   * @param {string} baseUrl - The service base URL
   * @returns {string} The service URL
   */

  /**
   * @member - Service tag
   * @type {string}
   */

  /**
   * @member - Service URL
   * @type {string}
   */

  /**
   * @member - Service params
   * @type {any}
   */


  /**
   * @member - Service name
   * @type {string}
   */


  _createClass(RequestBuilder, [{
    key: 'getUrl',
    value: function getUrl(baseUrl) {
      return baseUrl + '/service/' + this.service + (this.action ? '/action/' + this.action : '');
    }

    /**
     * Executes service
     * @function doHttpRequest
     * @returns {Promise.<any>} Service response as promise
     */

  }, {
    key: 'doHttpRequest',
    value: function doHttpRequest() {
      var _this = this;

      if (!this.url) {
        throw new Error("baseUrl is mandatory for request builder");
      }
      var request = new XMLHttpRequest();
      return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              var jsonResponse = JSON.parse(request.responseText);
              if (jsonResponse && (typeof jsonResponse === 'undefined' ? 'undefined' : _typeof(jsonResponse)) === 'object' && jsonResponse.code && jsonResponse.message) reject(jsonResponse);else resolve(jsonResponse);
            } else {
              reject(request.responseText);
            }
          }
        };
        request.open(_this.method, _this.url);
        _this.headers.forEach(function (value, key) {
          request.setRequestHeader(key, value);
        });
        request.send(_this.params);
      });
    }
  }]);

  return RequestBuilder;
}();

exports.default = RequestBuilder;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
(function (global) {
	"use strict";

	// Top level module for the global, static logger instance.
	var Logger = { };

	// For those that are at home that are keeping score.
	Logger.VERSION = "1.3.0";

	// Function which handles all incoming log messages.
	var logHandler;

	// Map of ContextualLogger instances by name; used by Logger.get() to return the same named instance.
	var contextualLoggersByNameMap = {};

	// Polyfill for ES5's Function.bind.
	var bind = function(scope, func) {
		return function() {
			return func.apply(scope, arguments);
		};
	};

	// Super exciting object merger-matron 9000 adding another 100 bytes to your download.
	var merge = function () {
		var args = arguments, target = args[0], key, i;
		for (i = 1; i < args.length; i++) {
			for (key in args[i]) {
				if (!(key in target) && args[i].hasOwnProperty(key)) {
					target[key] = args[i][key];
				}
			}
		}
		return target;
	};

	// Helper to define a logging level object; helps with optimisation.
	var defineLogLevel = function(value, name) {
		return { value: value, name: name };
	};

	// Predefined logging levels.
	Logger.DEBUG = defineLogLevel(1, 'DEBUG');
	Logger.INFO = defineLogLevel(2, 'INFO');
	Logger.TIME = defineLogLevel(3, 'TIME');
	Logger.WARN = defineLogLevel(4, 'WARN');
	Logger.ERROR = defineLogLevel(8, 'ERROR');
	Logger.OFF = defineLogLevel(99, 'OFF');

	// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
	// of each other.
	var ContextualLogger = function(defaultContext) {
		this.context = defaultContext;
		this.setLevel(defaultContext.filterLevel);
		this.log = this.info;  // Convenience alias.
	};

	ContextualLogger.prototype = {
		// Changes the current logging level for the logging instance.
		setLevel: function (newLevel) {
			// Ensure the supplied Level object looks valid.
			if (newLevel && "value" in newLevel) {
				this.context.filterLevel = newLevel;
			}
		},

		// Is the logger configured to output messages at the supplied level?
		enabledFor: function (lvl) {
			var filterLevel = this.context.filterLevel;
			return lvl.value >= filterLevel.value;
		},

		debug: function () {
			this.invoke(Logger.DEBUG, arguments);
		},

		info: function () {
			this.invoke(Logger.INFO, arguments);
		},

		warn: function () {
			this.invoke(Logger.WARN, arguments);
		},

		error: function () {
			this.invoke(Logger.ERROR, arguments);
		},

		time: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'start' ]);
			}
		},

		timeEnd: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'end' ]);
			}
		},

		// Invokes the logger callback if it's not being filtered.
		invoke: function (level, msgArgs) {
			if (logHandler && this.enabledFor(level)) {
				logHandler(msgArgs, merge({ level: level }, this.context));
			}
		}
	};

	// Protected instance which all calls to the to level `Logger` module will be routed through.
	var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

	// Configure the global Logger instance.
	(function() {
		// Shortcut for optimisers.
		var L = Logger;

		L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
		L.debug = bind(globalLogger, globalLogger.debug);
		L.time = bind(globalLogger, globalLogger.time);
		L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
		L.info = bind(globalLogger, globalLogger.info);
		L.warn = bind(globalLogger, globalLogger.warn);
		L.error = bind(globalLogger, globalLogger.error);

		// Don't forget the convenience alias!
		L.log = L.info;
	}());

	// Set the global logging handler.  The supplied function should expect two arguments, the first being an arguments
	// object with the supplied log messages and the second being a context object which contains a hash of stateful
	// parameters which the logging function can consume.
	Logger.setHandler = function (func) {
		logHandler = func;
	};

	// Sets the global logging filter level which applies to *all* previously registered, and future Logger instances.
	// (note that named loggers (retrieved via `Logger.get`) can be configured independently if required).
	Logger.setLevel = function(level) {
		// Set the globalLogger's level.
		globalLogger.setLevel(level);

		// Apply this level to all registered contextual loggers.
		for (var key in contextualLoggersByNameMap) {
			if (contextualLoggersByNameMap.hasOwnProperty(key)) {
				contextualLoggersByNameMap[key].setLevel(level);
			}
		}
	};

	// Retrieve a ContextualLogger instance.  Note that named loggers automatically inherit the global logger's level,
	// default context and log handler.
	Logger.get = function (name) {
		// All logger instances are cached so they can be configured ahead of use.
		return contextualLoggersByNameMap[name] ||
			(contextualLoggersByNameMap[name] = new ContextualLogger(merge({ name: name }, globalLogger.context)));
	};

	// CreateDefaultHandler returns a handler function which can be passed to `Logger.setHandler()` which will
	// write to the window's console object (if present); the optional options object can be used to customise the
	// formatter used to format each log message.
	Logger.createDefaultHandler = function (options) {
		options = options || {};

		options.formatter = options.formatter || function defaultMessageFormatter(messages, context) {
			// Prepend the logger's name to the log message for easy identification.
			if (context.name) {
				messages.unshift("[" + context.name + "]");
			}
		};

		// Map of timestamps by timer labels used to track `#time` and `#timeEnd()` invocations in environments
		// that don't offer a native console method.
		var timerStartTimeByLabelMap = {};

		// Support for IE8+ (and other, slightly more sane environments)
		var invokeConsoleMethod = function (hdlr, messages) {
			Function.prototype.apply.call(hdlr, console, messages);
		};

		// Check for the presence of a logger.
		if (typeof console === "undefined") {
			return function () { /* no console */ };
		}

		return function(messages, context) {
			// Convert arguments object to Array.
			messages = Array.prototype.slice.call(messages);

			var hdlr = console.log;
			var timerLabel;

			if (context.level === Logger.TIME) {
				timerLabel = (context.name ? '[' + context.name + '] ' : '') + messages[0];

				if (messages[1] === 'start') {
					if (console.time) {
						console.time(timerLabel);
					}
					else {
						timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
					}
				}
				else {
					if (console.timeEnd) {
						console.timeEnd(timerLabel);
					}
					else {
						invokeConsoleMethod(hdlr, [ timerLabel + ': ' +
							(new Date().getTime() - timerStartTimeByLabelMap[timerLabel]) + 'ms' ]);
					}
				}
			}
			else {
				// Delegate through to custom warn/error loggers if present on the console.
				if (context.level === Logger.WARN && console.warn) {
					hdlr = console.warn;
				} else if (context.level === Logger.ERROR && console.error) {
					hdlr = console.error;
				} else if (context.level === Logger.INFO && console.info) {
					hdlr = console.info;
				}

				options.formatter(messages, context);
				invokeConsoleMethod(hdlr, messages);
			}
		};
	};

	// Configure and example a Default implementation which writes to the `window.console` (if present).  The
	// `options` hash can be used to configure the default logLevel and provide a custom message formatter.
	Logger.useDefaults = function(options) {
		Logger.setLevel(options && options.defaultLevel || Logger.DEBUG);
		Logger.setHandler(Logger.createDefaultHandler(options));
	};

	// Export to popular environments boilerplate.
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (Logger),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Logger;
	}
	else {
		Logger._prevLogger = global.Logger;

		Logger.noConflict = function () {
			global.Logger = Logger._prevLogger;
			return Logger;
		};

		global.Logger = Logger;
	}
}(this));


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base service result
 * @classdesc
 */
var ServiceResult =

/**
 * @constructor
 * @param {Object} response - Service response
 */

/**
 * @member - The service error
 * @type {ServiceError}
 */

/**
 * @member - The service result data
 * @type {Object}
 */
function ServiceResult(response) {
  _classCallCheck(this, ServiceResult);

  this.hasError = false;

  if (response.objectType === "KalturaAPIException") {
    this.hasError = true;
    this.error = new ServiceError(response.code, response.message);
  } else {
    this.data = response;
  }
}

/**
 * @member - Is service returned an error
 * @type {boolean}
 */
;

/**
 * Service error
 * @classdesc
 */


exports.default = ServiceResult;

var ServiceError =

/**
 * @constructor
 * @param {string} code - The result code
 * @param {string} message - The result message
 */

/**
 * @member - The error code
 * @type {string}
 */
function ServiceError(code, message) {
  _classCallCheck(this, ServiceError);

  this.code = code;
  this.message = message;
}
/**
 * @member - The error message
 * @type {string}
 */
;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOG_LEVEL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsLogger = __webpack_require__(10);

var JsLogger = _interopRequireWildcard(_jsLogger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoggerFactory = function () {
  function LoggerFactory(options) {
    _classCallCheck(this, LoggerFactory);

    JsLogger.useDefaults(options || {});
  }

  _createClass(LoggerFactory, [{
    key: "get",
    value: function get(name) {
      if (!name) {
        return JsLogger;
      }
      return JsLogger.get(name);
    }
  }]);

  return LoggerFactory;
}();

var Logger = new LoggerFactory({ defaultLevel: JsLogger.DEBUG });
var LOG_LEVEL = {
  "DEBUG": JsLogger.DEBUG,
  "INFO": JsLogger.INFO,
  "TIME": JsLogger.TIME,
  "WARN": JsLogger.WARN,
  "ERROR": JsLogger.ERROR,
  "OFF": JsLogger.OFF
};

exports.default = Logger;
exports.LOG_LEVEL = LOG_LEVEL;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configuration = exports.RequestBuilder = exports.BookMarkService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ottService = __webpack_require__(9);

var _ottService2 = _interopRequireDefault(_ottService);

var _requestBuilder = __webpack_require__(0);

var _requestBuilder2 = _interopRequireDefault(_requestBuilder);

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERVICE_NAME = "bookmark";

/**
 * ottuser service methods
 * @classdesc
 */

var BookMarkService = function (_OttService) {
  _inherits(BookMarkService, _OttService);

  function BookMarkService() {
    _classCallCheck(this, BookMarkService);

    return _possibleConstructorReturn(this, (BookMarkService.__proto__ || Object.getPrototypeOf(BookMarkService)).apply(this, arguments));
  }

  _createClass(BookMarkService, null, [{
    key: 'add',

    /**
     * Creates an instance of RequestBuilder for session.startWidgetSession
     * @function add
     * @param {string} baseUrl The service base URL
     * @param {string} ks The partner ID
     * @param {Object} bookmark The udid
     * @returns {RequestBuilder} The request builder
     * @static
     */

    value: function add(baseUrl, ks, bookmark) {
      var headers = new Map();
      headers.set("Content-Type", "application/json");
      var request = new _requestBuilder2.default(headers);
      request.service = SERVICE_NAME;
      request.action = "add";
      request.method = "POST";
      request.url = request.getUrl(baseUrl);
      var playerData = {
        objectType: "KalturaBookmarkPlayerData", action: bookmark.playerData.action,
        averageBitrate: bookmark.playerData.averageBitrate, totalBitrate: bookmark.playerData.totalBitrate,
        currentBitrate: bookmark.playerData.currentBitrate, fileId: bookmark.playerData.fileId
      };
      var bookMarkServiceParams = {
        objectType: "KalturaBookmark",
        type: bookmark.type,
        id: bookmark.id,
        position: bookmark.position,
        playerData: playerData
      };
      var config = _config2.default.get();
      var serviceParams = config.serviceParams;
      Object.assign(serviceParams, { bookmark: bookMarkServiceParams, ks: ks });
      request.params = JSON.stringify(serviceParams);

      return request;
    }
  }]);

  return BookMarkService;
}(_ottService2.default);

exports.default = BookMarkService;
exports.BookMarkService = BookMarkService;
exports.RequestBuilder = _requestBuilder2.default;
exports.Configuration = _config2.default;

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiRequestResult = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestBuilder = __webpack_require__(0);

var _requestBuilder2 = _interopRequireDefault(_requestBuilder);

var _baseServiceResult = __webpack_require__(2);

var _baseServiceResult2 = _interopRequireDefault(_baseServiceResult);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constant
 */
var logger = _logger2.default.get("OvpProvider");

/**
 * Multi Request builder
 * @classdesc
 */

var MultiRequestBuilder = function (_RequestBuilder) {
  _inherits(MultiRequestBuilder, _RequestBuilder);

  function MultiRequestBuilder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiRequestBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiRequestBuilder.__proto__ || Object.getPrototypeOf(MultiRequestBuilder)).call.apply(_ref, [this].concat(args))), _this), _this.requests = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * @member - Array of requests
   * @type {Array<RequestBuilder>}
   */


  _createClass(MultiRequestBuilder, [{
    key: 'add',


    /**
     * Adds request to requests array
     * @function add
     * @param {RequestBuilder} request The request
     * @returns {MultiRequestBuilder} The multiRequest
     */
    value: function add(request) {
      this.requests.push(request);
      var requestParams = {};
      var serviceDef = { service: request.service, action: request.action };
      Object.assign(requestParams, _defineProperty({}, this.requests.length, Object.assign(serviceDef, request.params)));
      Object.assign(requestParams, this.params);
      this.params = requestParams;
      return this;
    }

    /**
     * Executes a multi request
     * @function execute
     * @returns {Promise} The multirequest execution promisie
     */

  }, {
    key: 'execute',
    value: function execute() {
      var _this2 = this;

      try {
        this.params = JSON.stringify(this.params);
      } catch (err) {
        logger.error('' + err.message);
      }
      return new Promise(function (resolve, reject) {
        _this2.doHttpRequest().then(function (data) {
          resolve(new MultiRequestResult(data));
        }, function (err) {
          var errorText = 'Error on multiRequest execution, error <' + err + '>.';
          reject(errorText);
        });
      });
    }
  }]);

  return MultiRequestBuilder;
}(_requestBuilder2.default);

/**
 * Multi Request result object
 * @classdesc
 */


exports.default = MultiRequestBuilder;

var MultiRequestResult =

/**
 * @constructor
 * @param {Object}  response data
 */


/**
 * @member - Is success
 * @type {boolean}
 */
exports.MultiRequestResult = function MultiRequestResult(response) {
  var _this3 = this;

  _classCallCheck(this, MultiRequestResult);

  this.results = [];

  this.success = true;
  var responseArr = response.result ? response.result : response;
  responseArr.forEach(function (result) {
    var serviceResult = new _baseServiceResult2.default(result);
    _this3.results.push(serviceResult);
    if (serviceResult.hasError) {
      logger.error('Service returned an error with error code: ' + serviceResult.error.code + ' and message: ' + serviceResult.error.message + '.');
      _this3.success = false;
      return;
    }
  });
}
/**
 * @member - Multi request response data
 * @type {Object}
 */
;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
  beUrl: "http://api-preprod.ott.kaltura.com/v4_6/api_v3",
  serviceParams: {
    clientTag: "playkit-js",
    apiVersion: '4.5.4.15337'
  }
};

var Configuration = function () {
  function Configuration() {
    _classCallCheck(this, Configuration);
  }

  _createClass(Configuration, null, [{
    key: "set",
    value: function set(clientConfig) {
      if (clientConfig) {
        Object.assign(defaultConfig, clientConfig);
      }
    }
  }, {
    key: "get",
    value: function get() {
      return defaultConfig;
    }
  }]);

  return Configuration;
}();

exports.default = Configuration;
exports.Configuration = Configuration;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _multiRequestBuilder = __webpack_require__(4);

var _multiRequestBuilder2 = _interopRequireDefault(_multiRequestBuilder);

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = _config2.default.get();
var SERVICE_NAME = "multirequest";

/**
 * Base for all ott services
 * @classdesc
 */

var OttService = function () {
  function OttService() {
    _classCallCheck(this, OttService);
  }

  _createClass(OttService, null, [{
    key: 'getMultirequest',

    /**
     * Gets a new instance of MultiRequestBuilder with ott params
     * @function getMultirequest
     * @param {string} ks The ks
     * @param {string} partnerId The partner ID
     * @returns {MultiRequestBuilder} The multi request builder
     * @static
     */
    value: function getMultirequest(ks, partnerId) {
      var ottParams = config.serviceParams;
      if (ks) {
        Object.assign(ottParams, { ks: ks });
      }
      if (partnerId) {
        Object.assign(ottParams, { partnerId: partnerId });
      }
      var headers = new Map();
      headers.set("Content-Type", "application/json");
      var multiReq = new _multiRequestBuilder2.default(headers);
      multiReq.method = "POST";
      multiReq.service = SERVICE_NAME;
      multiReq.url = multiReq.getUrl(config.beUrl);
      multiReq.params = ottParams;
      return multiReq;
    }
  }]);

  return OttService;
}();

exports.default = OttService;

/***/ })

/******/ });
});
//# sourceMappingURL=bookmarkService.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=playkit-ott-analytics.js.map