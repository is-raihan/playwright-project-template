import { TestCase, TestResult } from "@playwright/test/reporter";
export declare const getTestOutcome: (test: TestCase, result: TestResult) => "passed" | "failed" | "timedOut" | "skipped" | "interrupted";
