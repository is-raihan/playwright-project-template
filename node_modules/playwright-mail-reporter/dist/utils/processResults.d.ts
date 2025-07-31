import { Suite } from "@playwright/test/reporter";
import { MailReporterOptions } from "..";
export declare const processResults: (suite: Suite | undefined, options: MailReporterOptions) => Promise<void>;
