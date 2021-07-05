/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.genIndex = void 0;
const fs_1 = __webpack_require__(3);
const path_1 = __webpack_require__(4);
const util_1 = __webpack_require__(5);
const indexFileName = 'index';
const indexFileExt = '.ts';
const prefabName = 'prefab';
const prefabExtention = '.meta';
const descFileName = 'desc';
const descFileExt = '.json';
const folderName = ['res', 'script', 'anim', 'prefab'];
function genIndex(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        // 得到目录下所有文件名集合
        const result = yield util_1.promisify(fs_1.readdir)(dir);
        // 创建 newdir 目录
        for (let i = 0; i < folderName.length; i++) {
            fs_1.mkdir(dir + '/' + folderName[i], function (err) {
                if (err) {
                    throw err;
                }
            });
        }
        //   promisify(writeFile)(join(dir+'/script', indexFileName + indexFileExt), '')
        fs_1.readFile(path_1.join(__dirname, 'prefab.meta'), function (err, data) {
            // console.log(data);
            // 读取文件失败/错误
            let fileName = dir.split('\\')[dir.split('\\').length - 1];
            if (err) {
                throw err;
            }
            util_1.promisify(fs_1.writeFile)(path_1.join(dir + '/prefab', fileName + prefabExtention), data);
        });
        fs_1.readFile(path_1.join(__dirname, 'NewScript.txt'), 'utf-8', function (err, data) {
            // 读取文件失败/错误
            if (err) {
                throw err;
            }
            let fileName = dir.split('\\')[dir.split('\\').length - 1];
            data = data.replace(/__template__/g, fileName);
            // 读取文件成功
            util_1.promisify(fs_1.writeFile)(path_1.join(dir + '/script', fileName + indexFileExt), data);
        });
        fs_1.readFile(path_1.join(__dirname, 'desc.json'), 'utf-8', function (err, data) {
            // 读取文件失败/错误
            if (err) {
                throw err;
            }
            let fileName = dir.split('\\')[dir.split('\\').length - 1];
            data = data.replace(/__template__/g, fileName);
            // 读取文件成功
            util_1.promisify(fs_1.writeFile)(path_1.join(dir + '/', descFileName + descFileExt), data);
        });
    });
}
exports.genIndex = genIndex;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("util");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const createFile_1 = __webpack_require__(2);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "icecomponentinit" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('icecomponentinit.InitICEComponent', (uri) => {
        // uri会给出命令执行时选择的路径
        // 如果右键点击文件夹，这里就是文件夹的路径
        const dirPath = uri.fsPath;
        // 需要实现一个生成index.ts文件的函数
        createFile_1.genIndex(dirPath);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map