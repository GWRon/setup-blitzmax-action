"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.platform_name = exports.get = exports.archiveFormat = exports.apiUrl = void 0;
var https = __importStar(require("https"));
var os = __importStar(require("os"));
exports.apiUrl = 'https://github.com/bmx-ng/bmx-ng/releases/download/';
var knownArchiveFormats = ['.tar.xz', '.zip', '.7z'];
exports.archiveFormat = knownArchiveFormats[0];
var maxRetry = 3;
function get(version) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, _reject) { return __awaiter(_this, void 0, void 0, function () {
                    var json, retry, match, plat, tag_end, releasePageIndex, release, releaseIndex, asset, formatIndex, format;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Will search for BlitzMax release '" + version + "'");
                                return [4 /*yield*/, release_pages()
                                    // Okay, do a few retries to fetch releases if it failed
                                ];
                            case 1:
                                json = _a.sent();
                                if (!!json) return [3 /*break*/, 5];
                                retry = 1;
                                _a.label = 2;
                            case 2:
                                if (!(retry <= maxRetry)) return [3 /*break*/, 5];
                                console.log("Unable to fetch releases, retry " + retry + "/" + maxRetry);
                                return [4 /*yield*/, release_pages()];
                            case 3:
                                json = _a.sent();
                                _a.label = 4;
                            case 4:
                                retry++;
                                return [3 /*break*/, 2];
                            case 5:
                                if (!json)
                                    return [2 /*return*/, resolve(undefined)];
                                if (json == undefined)
                                    return [2 /*return*/, resolve(undefined)];
                                if (json.length <= 0)
                                    return [2 /*return*/, resolve(undefined)];
                                console.log("Comparing against " + json.length + " releases ...");
                                match = platform_name();
                                console.log("Matching against " + match + " ...");
                                plat = os.platform();
                                tag_end = "";
                                if (plat == 'win32')
                                    tag_end = "win32";
                                for (releasePageIndex = 0; releasePageIndex < json.length; releasePageIndex++) {
                                    release = json[releasePageIndex];
                                    for (releaseIndex = 0; releaseIndex < release.assets.length; releaseIndex++) {
                                        asset = release.assets[releaseIndex];
                                        // Is this a match for what we want?
                                        if (asset.name.startsWith(match) && (tag_end.length == 0 || release.tag_name.endsWith(tag_end))) {
                                            // Extract archive format
                                            exports.archiveFormat = knownArchiveFormats[0];
                                            for (formatIndex = 0; formatIndex < knownArchiveFormats.length; formatIndex++) {
                                                format = knownArchiveFormats[formatIndex];
                                                if (asset.name.toLowerCase().endsWith(format)) {
                                                    exports.archiveFormat = format;
                                                    break;
                                                }
                                            }
                                            // Extract version for potential matches
                                            asset.version = asset.name.substr(asset.name.lastIndexOf('_') + 1).
                                                slice(0, -exports.archiveFormat.length - 1);
                                            if (version == 'latest') {
                                                // Latest is always first, so just return first match
                                                return [2 /*return*/, resolve(asset)];
                                            }
                                            else {
                                                // Does it match the requested version?
                                                if (asset.version == version)
                                                    return [2 /*return*/, resolve(asset)];
                                            }
                                        }
                                    }
                                }
                                return [2 /*return*/, resolve(undefined)];
                        }
                    });
                }); })];
        });
    });
}
exports.get = get;
function release_pages() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, _reject) {
                    console.log('Fetching BlitzMax releases ...');
                    var options = {
                        host: 'api.github.com',
                        path: '/repos/bmx-ng/bmx-ng/releases',
                        method: 'GET',
                        headers: { 'user-agent': 'node.js' }
                    };
                    var body = '';
                    https.get(options, function (res) {
                        res.on('data', function (chunk) {
                            body += chunk;
                        });
                        res.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        _a = resolve;
                                        return [4 /*yield*/, JSON.parse(body)];
                                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                    case 2:
                                        error_1 = _b.sent();
                                        console.log(error_1.message);
                                        console.error(error_1.message);
                                        return [2 /*return*/, resolve(undefined)];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                    }).on("error", function (error) {
                        console.log(error.message);
                        console.error(error.message);
                        return resolve(undefined);
                    });
                })];
        });
    });
}
function platform_name() {
    var plat = os.platform();
    // Wants 'macos', 'linux', 'win32'
    if (plat === 'darwin')
        plat = 'macos';
    // Append arch to everything but 'win32'
    // This makes sure the Windows version is both x86 and x64
    if (plat !== 'win32')
        plat += '_' + os.arch();
    return 'BlitzMax_' + plat;
}
exports.platform_name = platform_name;
