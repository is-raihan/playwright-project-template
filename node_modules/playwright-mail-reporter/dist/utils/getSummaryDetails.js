"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryDetails = void 0;
const _1 = require(".");
const getSummaryDetails = (suite) => {
    const totalStatus = (0, _1.getTotalStatus)(suite.suites);
    const headerText = [`<li>Total tests: ${suite.allTests().length}</li>`];
    if (totalStatus.passed > 0) {
        headerText.push(`<li>Passed: ${totalStatus.passed}</li>`);
    }
    if (totalStatus.failed > 0) {
        headerText.push(`<li>Failed: ${totalStatus.failed}</li>`);
    }
    if (totalStatus.skipped > 0) {
        headerText.push(`<li>Skipped: ${totalStatus.skipped}</li>`);
    }
    if (totalStatus.timedOut > 0) {
        headerText.push(`<li>Timed Out: ${totalStatus.timedOut}</li>`);
    }
    return `<ul>${headerText.join("")}</ul>`;
};
exports.getSummaryDetails = getSummaryDetails;
