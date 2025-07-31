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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./getHtmlTable"), exports);
__exportStar(require("./getSummaryDetails"), exports);
__exportStar(require("./getTestAnnotations"), exports);
__exportStar(require("./getTestDuration"), exports);
__exportStar(require("./getTestHeading"), exports);
__exportStar(require("./getTestOutcome"), exports);
__exportStar(require("./getTestStatus"), exports);
__exportStar(require("./getTestTags"), exports);
__exportStar(require("./getTestTitle"), exports);
__exportStar(require("./getTestsPerFile"), exports);
__exportStar(require("./getTotalStatus"), exports);
__exportStar(require("./processResults"), exports);
