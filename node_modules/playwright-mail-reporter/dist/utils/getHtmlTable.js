"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlTable = void 0;
const ansi_to_html_1 = __importDefault(require("ansi-to-html"));
const _1 = require(".");
const constants_1 = require("../constants");
const getHtmlTable = (tests, showError) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const convert = new ansi_to_html_1.default();
    const content = [];
    let colLength = 5;
    if (showError) {
        colLength++;
    }
    const titleWidth = "20%";
    const restWidth = 80 / (colLength - 1) + "%";
    content.push(`<table role="presentation" border="0" width="100%" style="${constants_1.styles.table.root}">`);
    content.push(`<thead style="${constants_1.styles.table.thead}">`);
    content.push(`<tr>`);
    content.push(`<th style="${constants_1.styles.table.th} width:${titleWidth}">Test</th>`);
    content.push(`<th style="${constants_1.styles.table.th} width:${restWidth}">Status</th>`);
    content.push(`<th style="${constants_1.styles.table.th} width:${restWidth}">Duration</th>`);
    content.push(`<th style="${constants_1.styles.table.th} width:${restWidth}">Retries</th>`);
    content.push(`<th style="${constants_1.styles.table.th} width:${restWidth}">Tags</th>`);
    if (showError) {
        content.push(`<th style="${constants_1.styles.table.th} width:${restWidth}">Error</th>`);
    }
    content.push(`</tr>`);
    content.push(`</thead>`);
    content.push(`<tbody style="${constants_1.styles.table.tbody}">`);
    for (const test of tests) {
        // Get the last result
        const result = test.results[test.results.length - 1];
        if (test.annotations) {
            const annotations = yield (0, _1.getTestAnnotations)(test);
            if (annotations) {
                content.push(`<tr>`);
                content.push(`<td style="${constants_1.styles.table.td}" colspan="${colLength}">${annotations}</td>`);
                content.push(`</tr>`);
            }
        }
        content.push(`<tr>`);
        content.push(`<td style="${constants_1.styles.table.td} width:${titleWidth}">${(0, _1.getTestTitle)(test)}</td>`);
        content.push(`<td style="${constants_1.styles.table.td} width:${restWidth}">${(0, _1.getTestStatus)(test, result)}</td>`);
        content.push(`<td style="${constants_1.styles.table.td} width:${restWidth}">${(0, _1.getTestDuration)(result)}</td>`);
        content.push(`<td style="${constants_1.styles.table.td} width:${restWidth}">${(result === null || result === void 0 ? void 0 : result.retry) || ""}</td>`);
        content.push(`<td style="${constants_1.styles.table.td} width:${restWidth}">${(0, _1.getTestTags)(test)}</td>`);
        if (showError) {
            const error = ((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.message) || "";
            const errorMarkup = convert.toHtml(error);
            const cleanErrorMarkup = errorMarkup.replace(/style="[^"]*"/g, "");
            content.push(`<td style="${constants_1.styles.table.td} width:${restWidth}">${cleanErrorMarkup}</td>`);
        }
        content.push(`</tr>`);
    }
    content.push(`</tbody>`);
    content.push(`</table>`);
    return content.join("\n");
});
exports.getHtmlTable = getHtmlTable;
