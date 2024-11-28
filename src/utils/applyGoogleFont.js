"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFont = void 0;
const react_1 = require("react");
const Font = __importStar(require("expo-font"));
const GOOGLE_FONTS_API = 'https://fonts.googleapis.com/css2?family=';
const fontCache = {};
const loadFont = (fontFamily) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (fontCache[fontFamily]) {
        return;
    }
    try {
        const response = yield fetch(`${GOOGLE_FONTS_API}${fontFamily}`);
        const css = yield response.text();
        const fontUrl = (_a = css.match(/url\((.*?)\)/)) === null || _a === void 0 ? void 0 : _a[1];
        if (!fontUrl) {
            throw new Error(`Could not extract font URL for ${fontFamily}`);
        }
        yield Font.loadAsync({ [fontFamily]: fontUrl });
        fontCache[fontFamily] = true;
    }
    catch (error) {
        console.error(`Failed to load font ${fontFamily}:`, error);
        throw error;
    }
});
const useFont = (fontFamily) => {
    const [fontLoaded, setFontLoaded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (fontFamily) {
            loadFont(fontFamily)
                .then(() => setFontLoaded(true))
                .catch(() => setFontLoaded(false));
        }
    }, [fontFamily]);
    return fontLoaded;
};
exports.useFont = useFont;
