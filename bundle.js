/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _gifLooper = __webpack_require__(1);

	var _gifLooper2 = _interopRequireDefault(_gifLooper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _gifLooper2.default(document.querySelector('#gifs')).start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _gifSource = __webpack_require__(3);

	var _gifSource2 = _interopRequireDefault(_gifSource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(47);

	var GifLooper = (function () {
	  function GifLooper(container) {
	    _classCallCheck(this, GifLooper);

	    this._container = container;
	    this._source = _gifSource2.default.getDefault();
	    this._gifImage = null;
	    this._currentStartMs = null;
	  }

	  _createClass(GifLooper, [{
	    key: 'start',
	    value: function start() {
	      this._source.startDownloading();
	      this._waitForFirstDownload();
	    }
	  }, {
	    key: '_waitForFirstDownload',
	    value: function _waitForFirstDownload() {
	      var _this = this;

	      setTimeout(function () {
	        var gifImage = _this._source.getNextGifImage();
	        if (gifImage) {
	          _this._displayGifImage(gifImage);
	        } else {
	          _this._waitForFirstDownload();
	        }
	      }, 500);
	    }
	  }, {
	    key: '_displayGifImage',
	    value: function _displayGifImage(gifImage) {
	      this._gifImage = gifImage;

	      this._container.innerHTML = '';
	      this._container.appendChild(this._gifImage.image);

	      this._currentStartMs = Date.now();
	      this._wait();
	    }
	  }, {
	    key: '_maybeDisplayNext',
	    value: function _maybeDisplayNext() {
	      var gifImage = this._source.getNextGifImage();
	      if (gifImage) {
	        this._displayGifImage(gifImage);
	      } else {
	        this._wait();
	      }
	    }
	  }, {
	    key: '_wait',
	    value: function _wait() {
	      var _this2 = this;

	      var now = Date.now();

	      var gifMinDurationMs = Math.ceil(_config2.default.minDurationMs / this._gifImage.duration) * this._gifImage.duration;

	      var nextEligibleStopTimeMs = this._currentStartMs + gifMinDurationMs;
	      while (nextEligibleStopTimeMs < now) {
	        nextEligibleStopTimeMs += this._gifImage.duration;
	      }

	      var newDelayMs = nextEligibleStopTimeMs - now;

	      setTimeout(function () {
	        _this2._maybeDisplayNext();
	      }, newDelayMs);
	    }
	  }]);

	  return GifLooper;
	})();

	exports.default = GifLooper;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  sourceType: 'random',
	  minDurationMs: 1500,
	  numConcurrentDownloads: 5,

	  // sourceType-specific config:
	  random: {
	    numRememberedUrls: 200,
	    tags: [['funny', 'fun', 'hilarious', 'silly'], ['weird', 'absurd', 'strange', 'crazy', 'wtf'], 'fail', 'win', ['fall', 'spill', 'crash', ['stunt', 'stunts']], ['dance', 'dancing', ['breakdance', 'breakdancing']], ['infomercial', 'commercial'], [['cat', 'cats'], ['animal', 'animals']], 'reaction', '80s', [['laugh', 'laughing'], 'awkward']]
	  },
	  static: {
	    localUrlPrefix: 'gifs/',
	    preferLocalFiles: false
	  }

	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _gifRandomLibrary = __webpack_require__(4);

	var _gifRandomLibrary2 = _interopRequireDefault(_gifRandomLibrary);

	var _gifStaticLibrary = __webpack_require__(30);

	var _gifStaticLibrary2 = _interopRequireDefault(_gifStaticLibrary);

	var _gifRandomCacher = __webpack_require__(35);

	var _gifRandomCacher2 = _interopRequireDefault(_gifRandomCacher);

	var _gifSequentialCacher = __webpack_require__(46);

	var _gifSequentialCacher2 = _interopRequireDefault(_gifSequentialCacher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TYPES = {
	  'random': function random() {
	    return new GifSource(new _gifRandomLibrary2.default(), new _gifRandomCacher2.default());
	  },
	  'static': function _static() {
	    return new GifSource(new _gifStaticLibrary2.default(), new _gifSequentialCacher2.default());
	  }
	};

	var GifSource = (function () {
	  _createClass(GifSource, null, [{
	    key: 'getDefault',
	    value: function getDefault() {
	      return GifSource.getNew(_config2.default.sourceType);
	    }
	  }, {
	    key: 'getNew',
	    value: function getNew(type) {
	      return TYPES[type]();
	    }
	  }]);

	  function GifSource(library, cacher) {
	    _classCallCheck(this, GifSource);

	    this._cacher = cacher;
	    this._cacher.setLibrary(library);
	  }

	  _createClass(GifSource, [{
	    key: 'startDownloading',
	    value: function startDownloading() {
	      this._cacher.start();
	    }
	  }, {
	    key: 'getNextGifImage',
	    value: function getNextGifImage() {
	      return this._cacher.getNextGifImage();
	    }
	  }]);

	  return GifSource;
	})();

	exports.default = GifSource;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _sample = __webpack_require__(5);

	var _sample2 = _interopRequireDefault(_sample);

	var _gifHistory = __webpack_require__(28);

	var _gifHistory2 = _interopRequireDefault(_gifHistory);

	var _gifLibrary = __webpack_require__(29);

	var _gifLibrary2 = _interopRequireDefault(_gifLibrary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PUBLIC_API_KEY = 'dc6zaTOxFJmzC';

	var GifRandomLibrary = (function (_GifLibrary) {
	  _inherits(GifRandomLibrary, _GifLibrary);

	  function GifRandomLibrary() {
	    _classCallCheck(this, GifRandomLibrary);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GifRandomLibrary).call(this));

	    _this._history = new _gifHistory2.default();
	    return _this;
	  }

	  _createClass(GifRandomLibrary, [{
	    key: '_getTag',
	    value: function _getTag() {
	      var tagOrArray = (0, _sample2.default)(_config2.default.random.tags);
	      while (Array.isArray(tagOrArray)) {
	        tagOrArray = (0, _sample2.default)(tagOrArray);
	      }
	      return tagOrArray;
	    }
	  }, {
	    key: '_getApiUrl',
	    value: function _getApiUrl() {
	      return 'http://api.giphy.com/v1/gifs/random?tag=' + this._getTag() + '&api_key=' + PUBLIC_API_KEY;
	    }
	  }, {
	    key: 'getNextSet',
	    value: function getNextSet() {

	      var _handleStatus = function _handleStatus(response) {
	        if (response.statusText === 'OK') {
	          return Promise.resolve(response);
	        } else {
	          return Promise.reject('api request error');
	        }
	      };

	      var _requestData = function _requestData(response) {
	        return new Promise(function (resolve) {
	          response.json().then(function (json) {
	            resolve(json.data.image_url);
	          });
	        });
	      };

	      return fetch(this._getApiUrl()).then(_handleStatus).then(_requestData);
	    }
	  }, {
	    key: 'isAllowed',
	    value: function isAllowed(urls) {
	      return this._history.isAllowed(urls);
	    }
	  }]);

	  return GifRandomLibrary;
	})(_gifLibrary2.default);

	exports.default = GifRandomLibrary;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(6),
	    isIterateeCall = __webpack_require__(7),
	    toArray = __webpack_require__(14),
	    toIterable = __webpack_require__(27);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Gets a random element or `n` random elements from a collection.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to sample.
	 * @param {number} [n] The number of elements to sample.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {*} Returns the random sample(s).
	 * @example
	 *
	 * _.sample([1, 2, 3, 4]);
	 * // => 2
	 *
	 * _.sample([1, 2, 3, 4], 2);
	 * // => [3, 1]
	 */
	function sample(collection, n, guard) {
	  if (guard ? isIterateeCall(collection, n, guard) : n == null) {
	    collection = toIterable(collection);
	    var length = collection.length;
	    return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
	  }
	  var index = -1,
	      result = toArray(collection),
	      length = result.length,
	      lastIndex = length - 1;

	  n = nativeMin(n < 0 ? 0 : (+n || 0), length);
	  while (++index < n) {
	    var rand = baseRandom(index, lastIndex),
	        value = result[rand];

	    result[rand] = result[index];
	    result[index] = value;
	  }
	  result.length = n;
	  return result;
	}

	module.exports = sample;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;

	/**
	 * The base implementation of `_.random` without support for argument juggling
	 * and returning floating-point numbers.
	 *
	 * @private
	 * @param {number} min The minimum possible value.
	 * @param {number} max The maximum possible value.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(min, max) {
	  return min + nativeFloor(nativeRandom() * (max - min + 1));
	}

	module.exports = baseRandom;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(8),
	    isIndex = __webpack_require__(12),
	    isObject = __webpack_require__(13);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(9),
	    isLength = __webpack_require__(11);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(10);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(15),
	    getLength = __webpack_require__(9),
	    isLength = __webpack_require__(11),
	    values = __webpack_require__(16);

	/**
	 * Converts `value` to an array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the converted array.
	 * @example
	 *
	 * (function() {
	 *   return _.toArray(arguments).slice(1);
	 * }(1, 2, 3));
	 * // => [2, 3]
	 */
	function toArray(value) {
	  var length = value ? getLength(value) : 0;
	  if (!isLength(length)) {
	    return values(value);
	  }
	  if (!length) {
	    return [];
	  }
	  return arrayCopy(value);
	}

	module.exports = toArray;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(17),
	    keys = __webpack_require__(18);

	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  var index = -1,
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}

	module.exports = baseValues;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(19),
	    isArrayLike = __webpack_require__(8),
	    isObject = __webpack_require__(13),
	    shimKeys = __webpack_require__(23);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(20);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(21),
	    isObjectLike = __webpack_require__(22);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(24),
	    isArray = __webpack_require__(25),
	    isIndex = __webpack_require__(12),
	    isLength = __webpack_require__(11),
	    keysIn = __webpack_require__(26);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(8),
	    isObjectLike = __webpack_require__(22);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(19),
	    isLength = __webpack_require__(11),
	    isObjectLike = __webpack_require__(22);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(24),
	    isArray = __webpack_require__(25),
	    isIndex = __webpack_require__(12),
	    isLength = __webpack_require__(11),
	    isObject = __webpack_require__(13);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(8),
	    isObject = __webpack_require__(13),
	    values = __webpack_require__(16);

	/**
	 * Converts `value` to an array-like object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array|Object} Returns the array-like object.
	 */
	function toIterable(value) {
	  if (value == null) {
	    return [];
	  }
	  if (!isArrayLike(value)) {
	    return values(value);
	  }
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toIterable;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GifHistory = (function () {
	  function GifHistory() {
	    _classCallCheck(this, GifHistory);

	    this._urls = [];
	  }

	  _createClass(GifHistory, [{
	    key: 'isAllowed',
	    value: function isAllowed(urlOrArray) {
	      var _this = this;

	      var removeFirst = function removeFirst() {
	        _this._urls.splice(0, 1);
	      };

	      var urlsString = Array.isArray(urlOrArray) ? urlOrArray.join(',') : urlOrArray;
	      if (this._urls.some(function (currUrlsString) {
	        return currUrlsString === urlsString;
	      })) {
	        return false;
	      } else {
	        this._urls.push(urlsString);
	        while (this._urls.length > _config2.default.numRememberedUrls) {
	          removeFirst();
	        }
	        return true;
	      }
	    }
	  }]);

	  return GifHistory;
	})();

	exports.default = GifHistory;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GifLibrary = (function () {
	  function GifLibrary() {
	    _classCallCheck(this, GifLibrary);
	  }

	  _createClass(GifLibrary, [{
	    key: "getNextSet",
	    value: function getNextSet() {
	      // override me
	    }
	  }, {
	    key: "isAllowed",
	    value: function isAllowed() {
	      // override me if needed
	      return true;
	    }
	  }]);

	  return GifLibrary;
	})();

	exports.default = GifLibrary;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _flatten = __webpack_require__(31);

	var _flatten2 = _interopRequireDefault(_flatten);

	var _shuffle = __webpack_require__(34);

	var _shuffle2 = _interopRequireDefault(_shuffle);

	var _gifLibrary = __webpack_require__(29);

	var _gifLibrary2 = _interopRequireDefault(_gifLibrary);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var URLS = [['cat-double-take.gif', 'https://media.giphy.com/media/Zg44yLGbvXCjm/giphy.gif'], ['chewbacca-smash.gif', 'https://media.giphy.com/media/10juQ7fAaQjuHS/giphy.gif'], ['pool-slide-fail.gif', 'https://media.giphy.com/media/EG7bbilpEg6nS/giphy.gif'], ['cat-drinking.gif', 'https://media.giphy.com/media/WXNqe78uXxmKs/giphy.gif'], ['bar-worm.gif', 'https://media.giphy.com/media/xTk9ZEXFhScuvjX9bW/giphy.gif'], ['sabrina-cat-slap.gif', 'https://media.giphy.com/media/eHHjV2uahglMY/giphy.gif'], ['dog-crazy-tongue.gif', 'https://media.giphy.com/media/z66wZincEFYYg/giphy.gif'], ['creepy-sports-cheer.gif', 'https://media.giphy.com/media/11LplzzRswXDgs/giphy.gif'], 'http://media.giphy.com/media/KOS39Lrl3c4iA/giphy.gif', 'http://media.giphy.com/media/6JvVrxP6osBdC/giphy.gif', 'http://media.giphy.com/media/gzeYiFabZIteo/giphy.gif', 'http://33.media.tumblr.com/tumblr_m9imsbCaLa1rxlmf0o1_500.gif', 'http://33.media.tumblr.com/tumblr_m9gmnw0gLf1rxlmf0o1_500.gif', 'http://33.media.tumblr.com/260d62ce36d2b5967f940f4378ac6478/tumblr_inline_npyn8iaOGM1raprkq_500.gif', 'http://media.giphy.com/media/JqsPn9iLt2hEI/giphy.gif', 'http://media.giphy.com/media/mlMy72avA5GM0/giphy.gif', 'http://media.giphy.com/media/Zko99XD5cP8By/giphy.gif', 'http://media.giphy.com/media/P34fLBYz8fSco/giphy.gif', 'http://media.giphy.com/media/EBSiCEsg4giZO/giphy.gif', 'http://media.giphy.com/media/10hkBpr5ua7mCc/giphy.gif', 'http://media.giphy.com/media/Bhgb35SZjLW00/giphy.gif', 'http://media.giphy.com/media/V5iE42pj3B6kE/giphy.gif', 'http://media.giphy.com/media/rVeXubAormu8o/giphy.gif', 'http://media.giphy.com/media/vDZACy278sqT6/giphy.gif', 'http://media.giphy.com/media/YZtALRQ1wHdUQ/giphy.gif', 'http://media.giphy.com/media/oqpicLkw58HAc/giphy.gif', 'http://media3.giphy.com/media/ELPtC7diADV2o/giphy.gif', 'http://38.media.tumblr.com/bf1db33233b87ecc9eb8eaaaaf59b8aa/tumblr_inline_nnwea2azzD1raprkq_500.gif', 'http://media.giphy.com/media/icJi1WogcfJJu/giphy.gif', 'http://media.giphy.com/media/d0HZQ47wnCovu/giphy.gif', 'https://media.giphy.com/media/Q8OIR3s0hT5p6/giphy.gif', 'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif', 'https://media.giphy.com/media/26tOVXZALFoZdJ42I/giphy.gif', 'https://media.giphy.com/media/QoQ2XRLi6Wity/giphy.gif', 'https://media.giphy.com/media/Kan1AHHJmMRYA/giphy.gif', 'https://media.giphy.com/media/6xgslyYQCyLa8/giphy.gif', 'https://media.giphy.com/media/3o85xEjFxdWsjRGBUY/giphy.gif', 'https://media.giphy.com/media/YCfq5ZJtlEbQc/giphy.gif', 'https://media.giphy.com/media/8I7a41uPPoFSU/giphy.gif', 'https://media.giphy.com/media/FwpecpDvcu7vO/giphy.gif', 'https://media.giphy.com/media/qVVVfmHDMBZug/giphy.gif', 'https://media.giphy.com/media/pRLlVsvRNIkg/giphy.gif', 'https://media.giphy.com/media/5f98bs5zssg48/giphy.gif', 'https://media.giphy.com/media/5xtDarKod5wgCsDvVUk/giphy.gif', 'https://media.giphy.com/media/F6m56vjog5w5O/giphy.gif', 'https://media.giphy.com/media/kDmsG1ei4P1Yc/giphy.gif', 'https://media.giphy.com/media/5yaCPstUOV9Kw/giphy.gif', 'https://media.giphy.com/media/EcB3xTOOLThjG/giphy.gif', 'https://media.giphy.com/media/Bs7enjEVtXPk4/giphy.gif', 'https://media.giphy.com/media/j3CpFpRKlq3a8/giphy.gif', 'https://media.giphy.com/media/kanT1ZarQwtI4/giphy.gif', 'https://media.giphy.com/media/xTiTnooneW4SYfch8Y/giphy.gif', 'https://media.giphy.com/media/l41lR9cLxFqcJI4co/giphy.gif', 'https://media.giphy.com/media/keZQh4mo600pi/giphy.gif', 'https://media.giphy.com/media/xTiTnpXjPcsCmljq4E/giphy.gif', 'https://media.giphy.com/media/qqSJWZi167ozu/giphy.gif', 'https://media.giphy.com/media/tsIFjie7obBM4/giphy.gif', 'https://media.giphy.com/media/5FhJdxmOCCIXm/giphy.gif', 'https://media.giphy.com/media/13pDQ1xN6Tu3a8/giphy.gif', 'https://media.giphy.com/media/AAHUIzS2Oo8UM/giphy.gif'];

	var GifStaticLibrary = (function (_GifLibrary) {
	  _inherits(GifStaticLibrary, _GifLibrary);

	  function GifStaticLibrary() {
	    _classCallCheck(this, GifStaticLibrary);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GifStaticLibrary).call(this));

	    _this._gifIndex = -1;
	    _this._gifs = GifStaticLibrary._build(URLS);
	    return _this;
	  }

	  _createClass(GifStaticLibrary, [{
	    key: 'getNextSet',
	    value: function getNextSet() {
	      if (this._gifs.length) {
	        this._gifIndex = (this._gifIndex + 1) % this._gifs.length;
	        return this._gifs[this._gifIndex];
	      }
	    }
	  }], [{
	    key: '_build',
	    value: function _build(urls) {

	      var isRemote = function isRemote(url) {
	        return url.match(/^http/i);
	      };

	      var isLocal = function isLocal(url) {
	        return !isRemote(url);
	      };

	      return (0, _shuffle2.default)(urls.map(function (urlOrArray) {
	        return (0, _flatten2.default)(Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray], true);
	      }).map(function (urlAlternates) {
	        var localUrls = urlAlternates.filter(isLocal).map(function (url) {
	          return '' + _config2.default.static.localUrlPrefix + url;
	        });
	        var remoteUrls = urlAlternates.filter(isRemote);
	        return _config2.default.static.preferLocalFiles ? localUrls.concat(remoteUrls) : remoteUrls.concat(localUrls);
	      }));
	    }
	  }]);

	  return GifStaticLibrary;
	})(_gifLibrary2.default);

	exports.default = GifStaticLibrary;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(32),
	    isIterateeCall = __webpack_require__(7);

	/**
	 * Flattens a nested array. If `isDeep` is `true` the array is recursively
	 * flattened, otherwise it's only flattened a single level.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, 3, [4]]]);
	 * // => [1, 2, 3, [4]]
	 *
	 * // using `isDeep`
	 * _.flatten([1, [2, 3, [4]]], true);
	 * // => [1, 2, 3, 4]
	 */
	function flatten(array, isDeep, guard) {
	  var length = array ? array.length : 0;
	  if (guard && isIterateeCall(array, isDeep, guard)) {
	    isDeep = false;
	  }
	  return length ? baseFlatten(array, isDeep) : [];
	}

	module.exports = flatten;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(33),
	    isArguments = __webpack_require__(24),
	    isArray = __webpack_require__(25),
	    isArrayLike = __webpack_require__(8),
	    isObjectLike = __webpack_require__(22);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var sample = __webpack_require__(5);

	/** Used as references for `-Infinity` and `Infinity`. */
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

	/**
	 * Creates an array of shuffled values, using a version of the
	 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to shuffle.
	 * @returns {Array} Returns the new shuffled array.
	 * @example
	 *
	 * _.shuffle([1, 2, 3, 4]);
	 * // => [4, 1, 3, 2]
	 */
	function shuffle(collection) {
	  return sample(collection, POSITIVE_INFINITY);
	}

	module.exports = shuffle;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _range = __webpack_require__(36);

	var _range2 = _interopRequireDefault(_range);

	var _shuffle = __webpack_require__(34);

	var _shuffle2 = _interopRequireDefault(_shuffle);

	var _gifCacher = __webpack_require__(37);

	var _gifCacher2 = _interopRequireDefault(_gifCacher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GifRandomCacher = (function (_GifCacher) {
	  _inherits(GifRandomCacher, _GifCacher);

	  function GifRandomCacher() {
	    _classCallCheck(this, GifRandomCacher);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GifRandomCacher).apply(this, arguments));
	  }

	  _createClass(GifRandomCacher, [{
	    key: 'getNextGifImage',
	    value: function getNextGifImage() {
	      var _this2 = this;

	      var removeIndex = function removeIndex(index) {
	        _this2._downloads.splice(index, 1);
	      };

	      var removeFailed = function removeFailed() {
	        _this2._downloads = _this2._downloads.filter(function (download) {
	          return !download.hasFailed();
	        });
	      };

	      var getRandomCompletedGifIndex = function getRandomCompletedGifIndex() {
	        return (0, _shuffle2.default)((0, _range2.default)(_this2._downloads.length)).find(function (index) {
	          return _this2._downloads[index].hasGifImage();
	        });
	      };

	      var gifImage = null;

	      removeFailed();

	      var gifImageIndex = getRandomCompletedGifIndex();
	      if (gifImageIndex !== undefined) {
	        gifImage = this._downloads[gifImageIndex].getGifImage();
	        removeIndex(gifImageIndex);
	      }

	      this._fillCache();

	      return gifImage;
	    }
	  }]);

	  return GifRandomCacher;
	})(_gifCacher2.default);

	exports.default = GifRandomCacher;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(7);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. If `end` is not specified it's
	 * set to `start` with `start` then set to `0`. If `end` is less than `start`
	 * a zero-length range is created unless a negative `step` is specified.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	function range(start, end, step) {
	  if (step && isIterateeCall(start, end, step)) {
	    end = step = undefined;
	  }
	  start = +start || 0;
	  step = step == null ? 1 : (+step || 0);

	  if (end == null) {
	    end = start;
	    start = 0;
	  } else {
	    end = +end || 0;
	  }
	  // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	  // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);

	  while (++index < length) {
	    result[index] = start;
	    start += step;
	  }
	  return result;
	}

	module.exports = range;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _gifDownloader = __webpack_require__(38);

	var _gifDownloader2 = _interopRequireDefault(_gifDownloader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GifCacher = (function () {
	  function GifCacher() {
	    _classCallCheck(this, GifCacher);

	    this._library = null;
	    this._downloads = [];
	  }

	  _createClass(GifCacher, [{
	    key: 'start',
	    value: function start() {
	      this._fillCache();
	    }
	  }, {
	    key: 'setLibrary',
	    value: function setLibrary(library) {
	      this._library = library;
	    }
	  }, {
	    key: '_fillCache',
	    value: function _fillCache() {
	      while (this._downloads.length < _config2.default.numConcurrentDownloads) {
	        var download = new _gifDownloader2.default(this._library, this._library.getNextSet());
	        this._downloads.push(download);
	      }
	    }
	  }, {
	    key: 'getNextGifImage',
	    value: function getNextGifImage() {
	      // override me
	    }
	  }]);

	  return GifCacher;
	})();

	exports.default = GifCacher;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _gify = __webpack_require__(39);

	var _gify2 = _interopRequireDefault(_gify);

	var _gifImage = __webpack_require__(45);

	var _gifImage2 = _interopRequireDefault(_gifImage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var URL_CREATOR = window.URL || window.webkitURL;

	var GifDownloader = (function () {
	  function GifDownloader(library, urlOrArrayOrPromise) {
	    _classCallCheck(this, GifDownloader);

	    this._library = library;

	    this._index = 0;
	    this._gifImage = null;
	    this._hasFailed = false;

	    if (urlOrArrayOrPromise.then) {

	      // promise provided
	      urlOrArrayOrPromise.then(this._handleUrlOrArray.bind(this)).catch(this._handleError.bind(this));
	    } else {

	      this._handleUrlOrArray(urlOrArrayOrPromise);
	    }
	  }

	  _createClass(GifDownloader, [{
	    key: '_handleUrlOrArray',
	    value: function _handleUrlOrArray(urlOrArray) {
	      this._urls = Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray];
	      if (this._library.isAllowed(this._urls)) {
	        this._fetchNext();
	      } else {
	        this._fail('url used recently');
	      }
	    }
	  }, {
	    key: '_fetchNext',
	    value: function _fetchNext() {
	      this._fetchUrl(this._urls[this._index]);
	    }
	  }, {
	    key: '_getDuration',
	    value: function _getDuration(arrayBuffer) {
	      var gifInfo = _gify2.default.getInfo(arrayBuffer);
	      return gifInfo.durationChrome;
	    }
	  }, {
	    key: '_createImgFromData',
	    value: function _createImgFromData(arrayBuffer) {
	      var _this = this;

	      var promise = new Promise(function (resolve, reject) {
	        var duration = _this._getDuration(arrayBuffer);
	        var blob = new Blob([arrayBuffer], { type: "image/gif" });
	        var url = URL_CREATOR.createObjectURL(blob);
	        var img = new Image();
	        img.onload = function () {
	          URL_CREATOR.revokeObjectURL(url);
	          resolve(new _gifImage2.default(img, duration));
	        };
	        img.onerror = function () {
	          URL_CREATOR.revokeObjectURL(url);
	          reject('object url could not be loaded');
	        };
	        img.src = url;
	      });
	      return promise;
	    }
	  }, {
	    key: '_handleStatus',
	    value: function _handleStatus(response) {
	      if (response.statusText === 'OK') {
	        return Promise.resolve(response);
	      } else {
	        return Promise.reject('image could not be grabbed');
	      }
	    }
	  }, {
	    key: '_requestData',
	    value: function _requestData(response) {
	      return Promise.resolve(response.arrayBuffer());
	    }
	  }, {
	    key: '_fetchUrl',
	    value: function _fetchUrl(url) {
	      fetch(url).then(this._handleStatus).then(this._requestData).then(this._createImgFromData.bind(this)).then(this._finish.bind(this)).catch(this._handleError.bind(this));
	    }
	  }, {
	    key: '_handleError',
	    value: function _handleError(e) {
	      console.log('ERROR:', e);
	      if (this._index < this._urls.length - 1) {
	        console.log('attempting to load alternate...');
	        this._index++;
	        this._fetchNext();
	      } else {
	        this._fail('no more URLs to try');
	      }
	    }
	  }, {
	    key: '_fail',
	    value: function _fail(reason) {
	      console.log(reason);
	      this._hasFailed = true;
	    }
	  }, {
	    key: '_finish',
	    value: function _finish(gifImage) {
	      this._gifImage = gifImage;
	    }
	  }, {
	    key: 'getGifImage',
	    value: function getGifImage() {
	      return this._gifImage;
	    }
	  }, {
	    key: 'hasGifImage',
	    value: function hasGifImage() {
	      return !!this._gifImage;
	    }
	  }, {
	    key: 'hasFailed',
	    value: function hasFailed() {
	      return this._hasFailed;
	    }
	  }]);

	  return GifDownloader;
	})();

	exports.default = GifDownloader;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var jDataView = __webpack_require__(40);

	/*
	 * gify v1.1
	 * https://github.com/rfrench/gify
	 *
	 * Copyright 2013, Ryan French
	 *
	 * Licence: Do What The Fuck You Want To Public License
	 * http://www.wtfpl.net/
	 */

	/*global console, jDataView, ArrayBuffer */

	exports.default = (function () {
	  'use strict';

	  var defaultDelay = 100;

	  function getPaletteSize(palette) {
	    return 3 * Math.pow(2, 1 + bitToInt(palette.slice(5, 8)));
	  }
	  function getBitArray(num) {
	    var bits = [];
	    for (var i = 7; i >= 0; i--) {
	      bits.push(!!(num & 1 << i) ? 1 : 0);
	    }
	    return bits;
	  }
	  function getDuration(duration) {
	    return duration / 100 * 1000;
	  }
	  function bitToInt(bitArray) {
	    return bitArray.reduce(function (s, n) {
	      return s * 2 + n;
	    }, 0);
	  }
	  function readSubBlock(view, pos, read) {
	    var subBlock = {
	      data: '',
	      size: 0
	    };

	    while (true) {
	      var size = view.getUint8(pos + subBlock.size, true);
	      if (size === 0) {
	        subBlock.size++;
	        break;
	      }

	      if (read) {
	        subBlock.data += view.getString(size, pos + subBlock.size + 1);
	      }
	      subBlock.size += size + 1;
	    }

	    return subBlock;
	  }
	  function getNewImage() {
	    return {
	      identifier: '0',
	      localPalette: false,
	      localPaletteSize: 0,
	      interlace: false,
	      comments: [],
	      text: '',
	      left: 0,
	      top: 0,
	      width: 0,
	      height: 0,
	      delay: 0,
	      disposal: 0
	    };
	  }
	  function _getInfo(sourceArrayBuffer, quickPass) {
	    var pos = 0,
	        size = 0,
	        paletteSize = 0,
	        index = 0;

	    var info = {
	      valid: false,
	      globalPalette: false,
	      globalPaletteSize: 0,
	      loopCount: 0,
	      height: 0,
	      width: 0,
	      animated: false,
	      images: [],
	      isBrowserDuration: false,
	      duration: 0,
	      durationIE: 0,
	      durationSafari: 0,
	      durationFirefox: 0,
	      durationChrome: 0,
	      durationOpera: 0
	    };

	    var view = new jDataView(sourceArrayBuffer);

	    //needs to be at least 10 bytes long
	    if (sourceArrayBuffer.byteLength < 10) {
	      return info;
	    }

	    //GIF8
	    if (view.getUint16(0) != 0x4749 || view.getUint16(2) != 0x4638) {
	      return info;
	    }

	    //get height/width
	    info.height = view.getUint16(6, true);
	    info.width = view.getUint16(8, true);

	    //not that safe to assume, but good enough by this point
	    info.valid = true;

	    //parse global palette
	    var unpackedField = getBitArray(view.getUint8(10, true));
	    if (unpackedField[0]) {
	      var globalPaletteSize = getPaletteSize(unpackedField);
	      info.globalPalette = true;
	      info.globalPaletteSize = globalPaletteSize / 3;
	      pos += globalPaletteSize;
	    }
	    pos += 13;

	    var image = getNewImage();
	    while (true) {
	      try {
	        var block = view.getUint8(pos, true);

	        switch (block) {
	          case 0x21:
	            //EXTENSION BLOCK
	            var type = view.getUint8(pos + 1, true);

	            if (type === 0xF9) {
	              //GRAPHICS CONTROL EXTENSION
	              var length = view.getUint8(pos + 2);
	              if (length === 4) {

	                var delay = getDuration(view.getUint16(pos + 4, true));

	                if (delay < 60 && !info.isBrowserDuration) {
	                  info.isBrowserDuration = true;
	                }

	                //http://nullsleep.tumblr.com/post/16524517190/animated-gif-minimum-frame-delay-browser-compatibility (out of date)
	                image.delay = delay;
	                info.duration += delay;
	                info.durationIE += delay < 60 ? defaultDelay : delay;
	                info.durationSafari += delay < 20 ? defaultDelay : delay;
	                info.durationChrome += delay < 20 ? defaultDelay : delay;
	                info.durationFirefox += delay < 20 ? defaultDelay : delay;
	                info.durationOpera += delay < 20 ? defaultDelay : delay;

	                //set disposal method
	                var unpackedField = getBitArray(view.getUint8(pos + 3));
	                var disposal = unpackedField.slice(3, 6).join('');
	                image.disposal = parseInt(disposal, 2);

	                pos += 8;
	              } else {
	                pos++;
	              }
	            } else {
	              pos += 2;
	              var subBlock = readSubBlock(view, pos, true);
	              switch (type) {
	                case 0xFF:
	                  //APPLICATION EXTENSION
	                  info.loopCount = view.getUint8(pos + 16, true);
	                  break;
	                case 0xCE:
	                  //NAME
	                  /* the only reference to this extension I could find was in
	                     gifsicle. I'm not sure if this is something gifsicle just
	                     made up or if this actually exists outside of this app */
	                  image.identifier = subBlock.data;
	                  break;
	                case 0xFE:
	                  //COMMENT EXTENSION
	                  image.comments.push(subBlock.data);
	                  break;
	                case 0x01:
	                  //PLAIN TEXT EXTENSION
	                  image.text = subBlock.data;
	                  break;
	              }

	              pos += subBlock.size;
	            }
	            break;
	          case 0x2C:
	            //IMAGE DESCRIPTOR
	            image.left = view.getUint16(pos + 1, true);
	            image.top = view.getUint16(pos + 3, true);
	            image.width = view.getUint16(pos + 5, true);
	            image.height = view.getUint16(pos + 7, true);

	            var unpackedField = getBitArray(view.getUint8(pos + 9, true));
	            if (unpackedField[0]) {
	              //local palette?
	              var localPaletteSize = getPaletteSize(unpackedField);
	              image.localPalette = true;
	              image.localPaletteSize = localPaletteSize / 3;

	              pos += localPaletteSize;
	            }
	            if (unpackedField[1]) {
	              //interlaced?
	              image.interlace = true;
	            }

	            //add image & reset object
	            info.images.push(image);
	            index++;

	            //create new image
	            image = getNewImage();
	            image.identifier = index.toString();

	            //set animated flag
	            if (info.images.length > 1 && !info.animated) {
	              info.animated = true;

	              //quickly bail if the gif has more than one image
	              if (quickPass) {
	                return info;
	              }
	            }

	            pos += 11;
	            var subBlock = readSubBlock(view, pos, false);
	            pos += subBlock.size;
	            break;
	          case 0x3B:
	            //TRAILER BLOCK (THE END)
	            return info;
	          default:
	            //UNKNOWN BLOCK (bad)
	            pos++;
	            break;
	        }
	      } catch (e) {
	        info.valid = false;
	        return info;
	      }

	      //this shouldn't happen, but if the trailer block is missing, we should bail at EOF
	      if (pos >= sourceArrayBuffer.byteLength) {
	        return info;
	      }
	    }

	    return info;
	  }
	  return {
	    isAnimated: function isAnimated(sourceArrayBuffer) {
	      var info = _getInfo(sourceArrayBuffer, true);
	      return info.animated;
	    },
	    getInfo: function getInfo(sourceArrayBuffer) {
	      return _getInfo(sourceArrayBuffer, false);
	    }
	  };
	})();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {!function(factory) {
	    var global = this;
	    module.exports = factory(global);
	}(function(global) {
	    "use strict";
	    function is(obj, Ctor) {
	        return "object" != typeof obj || null === obj ? !1 : obj.constructor === Ctor || Object.prototype.toString.call(obj) === "[object " + Ctor.name + "]";
	    }
	    function arrayFrom(arrayLike, forceCopy) {
	        return !forceCopy && is(arrayLike, Array) ? arrayLike : Array.prototype.slice.call(arrayLike);
	    }
	    function defined(value, defaultValue) {
	        return void 0 !== value ? value : defaultValue;
	    }
	    function jDataView(buffer, byteOffset, byteLength, littleEndian) {
	        if (jDataView.is(buffer)) {
	            var result = buffer.slice(byteOffset, byteOffset + byteLength);
	            return result._littleEndian = defined(littleEndian, result._littleEndian), result;
	        }
	        if (!jDataView.is(this)) return new jDataView(buffer, byteOffset, byteLength, littleEndian);
	        if (this.buffer = buffer = jDataView.wrapBuffer(buffer), this._isArrayBuffer = compatibility.ArrayBuffer && is(buffer, ArrayBuffer), 
	        this._isPixelData = !1, this._isDataView = compatibility.DataView && this._isArrayBuffer, 
	        this._isNodeBuffer = !0 && compatibility.NodeBuffer && is(buffer, Buffer), !this._isNodeBuffer && !this._isArrayBuffer && !is(buffer, Array)) throw new TypeError("jDataView buffer has an incompatible type");
	        this._littleEndian = !!littleEndian;
	        var bufferLength = "byteLength" in buffer ? buffer.byteLength : buffer.length;
	        this.byteOffset = byteOffset = defined(byteOffset, 0), this.byteLength = byteLength = defined(byteLength, bufferLength - byteOffset), 
	        this._offset = this._bitOffset = 0, this._isDataView ? this._view = new DataView(buffer, byteOffset, byteLength) : this._checkBounds(byteOffset, byteLength, bufferLength), 
	        this._engineAction = this._isDataView ? this._dataViewAction : this._isNodeBuffer ? this._nodeBufferAction : this._isArrayBuffer ? this._arrayBufferAction : this._arrayAction;
	    }
	    function getCharCodes(string) {
	        if (compatibility.NodeBuffer) return new Buffer(string, "binary");
	        for (var Type = compatibility.ArrayBuffer ? Uint8Array : Array, codes = new Type(string.length), i = 0, length = string.length; length > i; i++) codes[i] = 255 & string.charCodeAt(i);
	        return codes;
	    }
	    function pow2(n) {
	        return n >= 0 && 31 > n ? 1 << n : pow2[n] || (pow2[n] = Math.pow(2, n));
	    }
	    function Uint64(lo, hi) {
	        this.lo = lo, this.hi = hi;
	    }
	    function Int64() {
	        Uint64.apply(this, arguments);
	    }
	    var compatibility = {
	        NodeBuffer: !0 && "Buffer" in global,
	        DataView: "DataView" in global,
	        ArrayBuffer: "ArrayBuffer" in global,
	        PixelData: !1
	    }, TextEncoder = global.TextEncoder, TextDecoder = global.TextDecoder;
	    compatibility.NodeBuffer && !function(buffer) {
	        try {
	            buffer.writeFloatLE(1/0, 0);
	        } catch (e) {
	            compatibility.NodeBuffer = !1;
	        }
	    }(new Buffer(4));
	    var dataTypes = {
	        Int8: 1,
	        Int16: 2,
	        Int32: 4,
	        Uint8: 1,
	        Uint16: 2,
	        Uint32: 4,
	        Float32: 4,
	        Float64: 8
	    };
	    jDataView.wrapBuffer = function(buffer) {
	        switch (typeof buffer) {
	          case "number":
	            if (compatibility.NodeBuffer) buffer = new Buffer(buffer), buffer.fill(0); else if (compatibility.ArrayBuffer) buffer = new Uint8Array(buffer).buffer; else {
	                buffer = new Array(buffer);
	                for (var i = 0; i < buffer.length; i++) buffer[i] = 0;
	            }
	            return buffer;

	          case "string":
	            buffer = getCharCodes(buffer);

	          default:
	            return "length" in buffer && !(compatibility.NodeBuffer && is(buffer, Buffer) || compatibility.ArrayBuffer && is(buffer, ArrayBuffer)) && (compatibility.NodeBuffer ? buffer = new Buffer(buffer) : compatibility.ArrayBuffer ? is(buffer, ArrayBuffer) || (buffer = new Uint8Array(buffer).buffer, 
	            is(buffer, ArrayBuffer) || (buffer = new Uint8Array(arrayFrom(buffer, !0)).buffer)) : buffer = arrayFrom(buffer)), 
	            buffer;
	        }
	    }, jDataView.is = function(view) {
	        return view && view.jDataView;
	    }, jDataView.from = function() {
	        return new jDataView(arguments);
	    }, jDataView.Uint64 = Uint64, Uint64.prototype = {
	        valueOf: function() {
	            return this.lo + pow2(32) * this.hi;
	        },
	        toString: function() {
	            return Number.prototype.toString.apply(this.valueOf(), arguments);
	        }
	    }, Uint64.fromNumber = function(number) {
	        var hi = Math.floor(number / pow2(32)), lo = number - hi * pow2(32);
	        return new Uint64(lo, hi);
	    }, jDataView.Int64 = Int64, Int64.prototype = "create" in Object ? Object.create(Uint64.prototype) : new Uint64(), 
	    Int64.prototype.valueOf = function() {
	        return this.hi < pow2(31) ? Uint64.prototype.valueOf.apply(this, arguments) : -(pow2(32) - this.lo + pow2(32) * (pow2(32) - 1 - this.hi));
	    }, Int64.fromNumber = function(number) {
	        var lo, hi;
	        if (number >= 0) {
	            var unsigned = Uint64.fromNumber(number);
	            lo = unsigned.lo, hi = unsigned.hi;
	        } else hi = Math.floor(number / pow2(32)), lo = number - hi * pow2(32), hi += pow2(32);
	        return new Int64(lo, hi);
	    };
	    var proto = jDataView.prototype = {
	        compatibility: compatibility,
	        jDataView: !0,
	        _checkBounds: function(byteOffset, byteLength, maxLength) {
	            if ("number" != typeof byteOffset) throw new TypeError("Offset is not a number.");
	            if ("number" != typeof byteLength) throw new TypeError("Size is not a number.");
	            if (0 > byteLength) throw new RangeError("Length is negative.");
	            if (0 > byteOffset || byteOffset + byteLength > defined(maxLength, this.byteLength)) throw new RangeError("Offsets are out of bounds.");
	        },
	        _action: function(type, isReadAction, byteOffset, littleEndian, value) {
	            return this._engineAction(type, isReadAction, defined(byteOffset, this._offset), defined(littleEndian, this._littleEndian), value);
	        },
	        _dataViewAction: function(type, isReadAction, byteOffset, littleEndian, value) {
	            return this._offset = byteOffset + dataTypes[type], isReadAction ? this._view["get" + type](byteOffset, littleEndian) : this._view["set" + type](byteOffset, value, littleEndian);
	        },
	        _arrayBufferAction: function(type, isReadAction, byteOffset, littleEndian, value) {
	            var typedArray, size = dataTypes[type], TypedArray = global[type + "Array"];
	            if (littleEndian = defined(littleEndian, this._littleEndian), 1 === size || (this.byteOffset + byteOffset) % size === 0 && littleEndian) return typedArray = new TypedArray(this.buffer, this.byteOffset + byteOffset, 1), 
	            this._offset = byteOffset + size, isReadAction ? typedArray[0] : typedArray[0] = value;
	            var bytes = new Uint8Array(isReadAction ? this.getBytes(size, byteOffset, littleEndian, !0) : size);
	            return typedArray = new TypedArray(bytes.buffer, 0, 1), isReadAction ? typedArray[0] : (typedArray[0] = value, 
	            void this._setBytes(byteOffset, bytes, littleEndian));
	        },
	        _arrayAction: function(type, isReadAction, byteOffset, littleEndian, value) {
	            return isReadAction ? this["_get" + type](byteOffset, littleEndian) : this["_set" + type](byteOffset, value, littleEndian);
	        },
	        _getBytes: function(length, byteOffset, littleEndian) {
	            littleEndian = defined(littleEndian, this._littleEndian), byteOffset = defined(byteOffset, this._offset), 
	            length = defined(length, this.byteLength - byteOffset), this._checkBounds(byteOffset, length), 
	            byteOffset += this.byteOffset, this._offset = byteOffset - this.byteOffset + length;
	            var result = this._isArrayBuffer ? new Uint8Array(this.buffer, byteOffset, length) : (this.buffer.slice || Array.prototype.slice).call(this.buffer, byteOffset, byteOffset + length);
	            return littleEndian || 1 >= length ? result : arrayFrom(result).reverse();
	        },
	        getBytes: function(length, byteOffset, littleEndian, toArray) {
	            var result = this._getBytes(length, byteOffset, defined(littleEndian, !0));
	            return toArray ? arrayFrom(result) : result;
	        },
	        _setBytes: function(byteOffset, bytes, littleEndian) {
	            var length = bytes.length;
	            if (0 !== length) {
	                if (littleEndian = defined(littleEndian, this._littleEndian), byteOffset = defined(byteOffset, this._offset), 
	                this._checkBounds(byteOffset, length), !littleEndian && length > 1 && (bytes = arrayFrom(bytes, !0).reverse()), 
	                byteOffset += this.byteOffset, this._isArrayBuffer) new Uint8Array(this.buffer, byteOffset, length).set(bytes); else if (this._isNodeBuffer) new Buffer(bytes).copy(this.buffer, byteOffset); else for (var i = 0; length > i; i++) this.buffer[byteOffset + i] = bytes[i];
	                this._offset = byteOffset - this.byteOffset + length;
	            }
	        },
	        setBytes: function(byteOffset, bytes, littleEndian) {
	            this._setBytes(byteOffset, bytes, defined(littleEndian, !0));
	        },
	        getString: function(byteLength, byteOffset, encoding) {
	            if (this._isNodeBuffer) return byteOffset = defined(byteOffset, this._offset), byteLength = defined(byteLength, this.byteLength - byteOffset), 
	            this._checkBounds(byteOffset, byteLength), this._offset = byteOffset + byteLength, 
	            this.buffer.toString(encoding || "binary", this.byteOffset + byteOffset, this.byteOffset + this._offset);
	            var bytes = this._getBytes(byteLength, byteOffset, !0);
	            if (encoding = "utf8" === encoding ? "utf-8" : encoding || "binary", TextDecoder && "binary" !== encoding) return new TextDecoder(encoding).decode(this._isArrayBuffer ? bytes : new Uint8Array(bytes));
	            var string = "";
	            byteLength = bytes.length;
	            for (var i = 0; byteLength > i; i++) string += String.fromCharCode(bytes[i]);
	            return "utf-8" === encoding && (string = decodeURIComponent(escape(string))), string;
	        },
	        setString: function(byteOffset, subString, encoding) {
	            if (this._isNodeBuffer) return byteOffset = defined(byteOffset, this._offset), this._checkBounds(byteOffset, subString.length), 
	            void (this._offset = byteOffset + this.buffer.write(subString, this.byteOffset + byteOffset, encoding || "binary"));
	            encoding = "utf8" === encoding ? "utf-8" : encoding || "binary";
	            var bytes;
	            TextEncoder && "binary" !== encoding ? bytes = new TextEncoder(encoding).encode(subString) : ("utf-8" === encoding && (subString = unescape(encodeURIComponent(subString))), 
	            bytes = getCharCodes(subString)), this._setBytes(byteOffset, bytes, !0);
	        },
	        getChar: function(byteOffset) {
	            return this.getString(1, byteOffset);
	        },
	        setChar: function(byteOffset, character) {
	            this.setString(byteOffset, character);
	        },
	        tell: function() {
	            return this._offset;
	        },
	        seek: function(byteOffset) {
	            return this._checkBounds(byteOffset, 0), this._offset = byteOffset;
	        },
	        skip: function(byteLength) {
	            return this.seek(this._offset + byteLength);
	        },
	        slice: function(start, end, forceCopy) {
	            function normalizeOffset(offset, byteLength) {
	                return 0 > offset ? offset + byteLength : offset;
	            }
	            return start = normalizeOffset(start, this.byteLength), end = normalizeOffset(defined(end, this.byteLength), this.byteLength), 
	            forceCopy ? new jDataView(this.getBytes(end - start, start, !0, !0), void 0, void 0, this._littleEndian) : new jDataView(this.buffer, this.byteOffset + start, end - start, this._littleEndian);
	        },
	        alignBy: function(byteCount) {
	            return this._bitOffset = 0, 1 !== defined(byteCount, 1) ? this.skip(byteCount - (this._offset % byteCount || byteCount)) : this._offset;
	        },
	        _getFloat64: function(byteOffset, littleEndian) {
	            var b = this._getBytes(8, byteOffset, littleEndian), sign = 1 - 2 * (b[7] >> 7), exponent = ((b[7] << 1 & 255) << 3 | b[6] >> 4) - 1023, mantissa = (15 & b[6]) * pow2(48) + b[5] * pow2(40) + b[4] * pow2(32) + b[3] * pow2(24) + b[2] * pow2(16) + b[1] * pow2(8) + b[0];
	            return 1024 === exponent ? 0 !== mantissa ? 0/0 : 1/0 * sign : -1023 === exponent ? sign * mantissa * pow2(-1074) : sign * (1 + mantissa * pow2(-52)) * pow2(exponent);
	        },
	        _getFloat32: function(byteOffset, littleEndian) {
	            var b = this._getBytes(4, byteOffset, littleEndian), sign = 1 - 2 * (b[3] >> 7), exponent = (b[3] << 1 & 255 | b[2] >> 7) - 127, mantissa = (127 & b[2]) << 16 | b[1] << 8 | b[0];
	            return 128 === exponent ? 0 !== mantissa ? 0/0 : 1/0 * sign : -127 === exponent ? sign * mantissa * pow2(-149) : sign * (1 + mantissa * pow2(-23)) * pow2(exponent);
	        },
	        _get64: function(Type, byteOffset, littleEndian) {
	            littleEndian = defined(littleEndian, this._littleEndian), byteOffset = defined(byteOffset, this._offset);
	            for (var parts = littleEndian ? [ 0, 4 ] : [ 4, 0 ], i = 0; 2 > i; i++) parts[i] = this.getUint32(byteOffset + parts[i], littleEndian);
	            return this._offset = byteOffset + 8, new Type(parts[0], parts[1]);
	        },
	        getInt64: function(byteOffset, littleEndian) {
	            return this._get64(Int64, byteOffset, littleEndian);
	        },
	        getUint64: function(byteOffset, littleEndian) {
	            return this._get64(Uint64, byteOffset, littleEndian);
	        },
	        _getInt32: function(byteOffset, littleEndian) {
	            var b = this._getBytes(4, byteOffset, littleEndian);
	            return b[3] << 24 | b[2] << 16 | b[1] << 8 | b[0];
	        },
	        _getUint32: function(byteOffset, littleEndian) {
	            return this._getInt32(byteOffset, littleEndian) >>> 0;
	        },
	        _getInt16: function(byteOffset, littleEndian) {
	            return this._getUint16(byteOffset, littleEndian) << 16 >> 16;
	        },
	        _getUint16: function(byteOffset, littleEndian) {
	            var b = this._getBytes(2, byteOffset, littleEndian);
	            return b[1] << 8 | b[0];
	        },
	        _getInt8: function(byteOffset) {
	            return this._getUint8(byteOffset) << 24 >> 24;
	        },
	        _getUint8: function(byteOffset) {
	            return this._getBytes(1, byteOffset)[0];
	        },
	        _getBitRangeData: function(bitLength, byteOffset) {
	            var startBit = (defined(byteOffset, this._offset) << 3) + this._bitOffset, endBit = startBit + bitLength, start = startBit >>> 3, end = endBit + 7 >>> 3, b = this._getBytes(end - start, start, !0), wideValue = 0;
	            (this._bitOffset = 7 & endBit) && (this._bitOffset -= 8);
	            for (var i = 0, length = b.length; length > i; i++) wideValue = wideValue << 8 | b[i];
	            return {
	                start: start,
	                bytes: b,
	                wideValue: wideValue
	            };
	        },
	        getSigned: function(bitLength, byteOffset) {
	            var shift = 32 - bitLength;
	            return this.getUnsigned(bitLength, byteOffset) << shift >> shift;
	        },
	        getUnsigned: function(bitLength, byteOffset) {
	            var value = this._getBitRangeData(bitLength, byteOffset).wideValue >>> -this._bitOffset;
	            return 32 > bitLength ? value & ~(-1 << bitLength) : value;
	        },
	        _setBinaryFloat: function(byteOffset, value, mantSize, expSize, littleEndian) {
	            var exponent, mantissa, signBit = 0 > value ? 1 : 0, eMax = ~(-1 << expSize - 1), eMin = 1 - eMax;
	            0 > value && (value = -value), 0 === value ? (exponent = 0, mantissa = 0) : isNaN(value) ? (exponent = 2 * eMax + 1, 
	            mantissa = 1) : 1/0 === value ? (exponent = 2 * eMax + 1, mantissa = 0) : (exponent = Math.floor(Math.log(value) / Math.LN2), 
	            exponent >= eMin && eMax >= exponent ? (mantissa = Math.floor((value * pow2(-exponent) - 1) * pow2(mantSize)), 
	            exponent += eMax) : (mantissa = Math.floor(value / pow2(eMin - mantSize)), exponent = 0));
	            for (var b = []; mantSize >= 8; ) b.push(mantissa % 256), mantissa = Math.floor(mantissa / 256), 
	            mantSize -= 8;
	            for (exponent = exponent << mantSize | mantissa, expSize += mantSize; expSize >= 8; ) b.push(255 & exponent), 
	            exponent >>>= 8, expSize -= 8;
	            b.push(signBit << expSize | exponent), this._setBytes(byteOffset, b, littleEndian);
	        },
	        _setFloat32: function(byteOffset, value, littleEndian) {
	            this._setBinaryFloat(byteOffset, value, 23, 8, littleEndian);
	        },
	        _setFloat64: function(byteOffset, value, littleEndian) {
	            this._setBinaryFloat(byteOffset, value, 52, 11, littleEndian);
	        },
	        _set64: function(Type, byteOffset, value, littleEndian) {
	            "object" != typeof value && (value = Type.fromNumber(value)), littleEndian = defined(littleEndian, this._littleEndian), 
	            byteOffset = defined(byteOffset, this._offset);
	            var parts = littleEndian ? {
	                lo: 0,
	                hi: 4
	            } : {
	                lo: 4,
	                hi: 0
	            };
	            for (var partName in parts) this.setUint32(byteOffset + parts[partName], value[partName], littleEndian);
	            this._offset = byteOffset + 8;
	        },
	        setInt64: function(byteOffset, value, littleEndian) {
	            this._set64(Int64, byteOffset, value, littleEndian);
	        },
	        setUint64: function(byteOffset, value, littleEndian) {
	            this._set64(Uint64, byteOffset, value, littleEndian);
	        },
	        _setUint32: function(byteOffset, value, littleEndian) {
	            this._setBytes(byteOffset, [ 255 & value, value >>> 8 & 255, value >>> 16 & 255, value >>> 24 ], littleEndian);
	        },
	        _setUint16: function(byteOffset, value, littleEndian) {
	            this._setBytes(byteOffset, [ 255 & value, value >>> 8 & 255 ], littleEndian);
	        },
	        _setUint8: function(byteOffset, value) {
	            this._setBytes(byteOffset, [ 255 & value ]);
	        },
	        setUnsigned: function(byteOffset, value, bitLength) {
	            var data = this._getBitRangeData(bitLength, byteOffset), wideValue = data.wideValue, b = data.bytes;
	            wideValue &= ~(~(-1 << bitLength) << -this._bitOffset), wideValue |= (32 > bitLength ? value & ~(-1 << bitLength) : value) << -this._bitOffset;
	            for (var i = b.length - 1; i >= 0; i--) b[i] = 255 & wideValue, wideValue >>>= 8;
	            this._setBytes(data.start, b, !0);
	        }
	    }, nodeNaming = {
	        Int8: "Int8",
	        Int16: "Int16",
	        Int32: "Int32",
	        Uint8: "UInt8",
	        Uint16: "UInt16",
	        Uint32: "UInt32",
	        Float32: "Float",
	        Float64: "Double"
	    };
	    proto._nodeBufferAction = function(type, isReadAction, byteOffset, littleEndian, value) {
	        this._offset = byteOffset + dataTypes[type];
	        var nodeName = nodeNaming[type] + ("Int8" === type || "Uint8" === type ? "" : littleEndian ? "LE" : "BE");
	        return byteOffset += this.byteOffset, isReadAction ? this.buffer["read" + nodeName](byteOffset) : this.buffer["write" + nodeName](value, byteOffset);
	    };
	    for (var type in dataTypes) !function(type) {
	        proto["get" + type] = function(byteOffset, littleEndian) {
	            return this._action(type, !0, byteOffset, littleEndian);
	        }, proto["set" + type] = function(byteOffset, value, littleEndian) {
	            this._action(type, !1, byteOffset, littleEndian, value);
	        };
	    }(type);
	    proto._setInt32 = proto._setUint32, proto._setInt16 = proto._setUint16, proto._setInt8 = proto._setUint8, 
	    proto.setSigned = proto.setUnsigned;
	    for (var method in proto) "set" === method.slice(0, 3) && !function(type) {
	        proto["write" + type] = function() {
	            Array.prototype.unshift.call(arguments, void 0), this["set" + type].apply(this, arguments);
	        };
	    }(method.slice(3));
	    return jDataView;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41).Buffer))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(42)
	var ieee754 = __webpack_require__(43)
	var isArray = __webpack_require__(44)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41).Buffer, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 44 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GifImage = function GifImage(image, duration) {
	  _classCallCheck(this, GifImage);

	  this.image = image;
	  this.duration = duration;
	};

	exports.default = GifImage;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _gifCacher = __webpack_require__(37);

	var _gifCacher2 = _interopRequireDefault(_gifCacher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GifSequentialCacher = (function (_GifCacher) {
	  _inherits(GifSequentialCacher, _GifCacher);

	  function GifSequentialCacher() {
	    _classCallCheck(this, GifSequentialCacher);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GifSequentialCacher).apply(this, arguments));
	  }

	  _createClass(GifSequentialCacher, [{
	    key: 'getNextGifImage',
	    value: function getNextGifImage() {
	      var _this2 = this;

	      var removeFirst = function removeFirst() {
	        _this2._downloads.splice(0, 1);
	      };

	      var gifImage = null;

	      if (this._downloads.length) {
	        var firstDownload = this._downloads[0];
	        if (firstDownload.hasFailed()) {
	          removeFirst();
	          return this.getNextGifImage();
	        } else {
	          gifImage = firstDownload.getGifImage();
	          if (gifImage) {
	            removeFirst();
	          }
	        }
	      }

	      this._fillCache();

	      return gifImage;
	    }
	  }]);

	  return GifSequentialCacher;
	})(_gifCacher2.default);

	exports.default = GifSequentialCacher;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = (function () {

	  if (!window.hasOwnProperty('fetch')) {
	    console.log('polyfilling fetch()');
	    __webpack_require__(48);
	  }
	})();

/***/ },
/* 48 */
/***/ function(module, exports) {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ }
/******/ ]);