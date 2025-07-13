/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dequal";
exports.ids = ["vendor-chunks/dequal"];
exports.modules = {

/***/ "(ssr)/./node_modules/dequal/lite/index.js":
/*!*******************************************!*\
  !*** ./node_modules/dequal/lite/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("var has = Object.prototype.hasOwnProperty;\n\nfunction dequal(foo, bar) {\n\tvar ctor, len;\n\tif (foo === bar) return true;\n\n\tif (foo && bar && (ctor=foo.constructor) === bar.constructor) {\n\t\tif (ctor === Date) return foo.getTime() === bar.getTime();\n\t\tif (ctor === RegExp) return foo.toString() === bar.toString();\n\n\t\tif (ctor === Array) {\n\t\t\tif ((len=foo.length) === bar.length) {\n\t\t\t\twhile (len-- && dequal(foo[len], bar[len]));\n\t\t\t}\n\t\t\treturn len === -1;\n\t\t}\n\n\t\tif (!ctor || typeof foo === 'object') {\n\t\t\tlen = 0;\n\t\t\tfor (ctor in foo) {\n\t\t\t\tif (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;\n\t\t\t\tif (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;\n\t\t\t}\n\t\t\treturn Object.keys(bar).length === len;\n\t\t}\n\t}\n\n\treturn foo !== foo && bar !== bar;\n}\n\nexports.dequal = dequal;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVxdWFsL2xpdGUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsY0FBYyIsInNvdXJjZXMiOlsiL1VzZXJzL2lrdXRhZGFpc3VrZS9kZXZlbG9wbWVudC9hbGJhcmlzZS1ocC9ub2RlX21vZHVsZXMvZGVxdWFsL2xpdGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGRlcXVhbChmb28sIGJhcikge1xuXHR2YXIgY3RvciwgbGVuO1xuXHRpZiAoZm9vID09PSBiYXIpIHJldHVybiB0cnVlO1xuXG5cdGlmIChmb28gJiYgYmFyICYmIChjdG9yPWZvby5jb25zdHJ1Y3RvcikgPT09IGJhci5jb25zdHJ1Y3Rvcikge1xuXHRcdGlmIChjdG9yID09PSBEYXRlKSByZXR1cm4gZm9vLmdldFRpbWUoKSA9PT0gYmFyLmdldFRpbWUoKTtcblx0XHRpZiAoY3RvciA9PT0gUmVnRXhwKSByZXR1cm4gZm9vLnRvU3RyaW5nKCkgPT09IGJhci50b1N0cmluZygpO1xuXG5cdFx0aWYgKGN0b3IgPT09IEFycmF5KSB7XG5cdFx0XHRpZiAoKGxlbj1mb28ubGVuZ3RoKSA9PT0gYmFyLmxlbmd0aCkge1xuXHRcdFx0XHR3aGlsZSAobGVuLS0gJiYgZGVxdWFsKGZvb1tsZW5dLCBiYXJbbGVuXSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxlbiA9PT0gLTE7XG5cdFx0fVxuXG5cdFx0aWYgKCFjdG9yIHx8IHR5cGVvZiBmb28gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRsZW4gPSAwO1xuXHRcdFx0Zm9yIChjdG9yIGluIGZvbykge1xuXHRcdFx0XHRpZiAoaGFzLmNhbGwoZm9vLCBjdG9yKSAmJiArK2xlbiAmJiAhaGFzLmNhbGwoYmFyLCBjdG9yKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoIShjdG9yIGluIGJhcikgfHwgIWRlcXVhbChmb29bY3Rvcl0sIGJhcltjdG9yXSkpIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyhiYXIpLmxlbmd0aCA9PT0gbGVuO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmb28gIT09IGZvbyAmJiBiYXIgIT09IGJhcjtcbn1cblxuZXhwb3J0cy5kZXF1YWwgPSBkZXF1YWw7Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dequal/lite/index.js\n");

/***/ })

};
;