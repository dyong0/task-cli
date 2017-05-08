import { expect } from "chai";
import {CliEntry, cliEntry} from "../../src/cli/CliEntry";

describe("CliEntry", () => {
    let defaultArgs: string[];

    beforeEach(() => {
        defaultArgs = ["task"];
    });

    describe("#executeCommand()", () => {
        describe("when any arg is not given", () => {
            it("should accept", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat([]))).not.throw(Error);
            });
        });

        describe("list or l is given", () => {
            it("should accept when any extra arg is not given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["list"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["l"]))).not.throw(Error);
            });
            it("should accept when -o is given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["list", "-o"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["l", "-o"]))).not.throw(Error);
            });
            it("should accept when -c is given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["list", "-c"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["l", "-c"]))).not.throw(Error);
            });
            it("should accept when -d is given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["list", "-d"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["l", "-d"]))).not.throw(Error);
            });
        });

        describe("add or a is given", () => {
            context("when any extra arg is not given", () => {
                it("should accept", () => {
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["add"]))).not.throw(Error);
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["a"]))).not.throw(Error);
                });
            });

            context("when extra some args are given", () => {
                it("should accept when a plain text is given", () => {
                    const plainText = "write an essay";
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["add", plainText]))).not.throw(Error);
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["a", plainText]))).not.throw(Error);
                });
                it("should accept when a plain text and a parent id are given", () => {
                    const plainText = "write an essay";
                    const parentId = "1";

                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["add", plainText, parentId]))).not.throw(Error);
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(["a", plainText, parentId]))).not.throw(Error);
                });
            });
        });

        describe("delete or d is given", () => {
            it("should accept when extra arg is not given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["delete"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["d"]))).not.throw(Error);
            });

            it("should accept when a task id is given", () => {
                const parentId = "1";

                expect(() => cliEntry.executeCommand(defaultArgs.concat(["delete", parentId]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["d", parentId]))).not.throw(Error);
            });
        });

        describe("complete or c is given", () => {
            it("should accept when extra arg is not given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["complete"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["c"]))).not.throw(Error);
            });

            it("should accept when a task id is given", () => {
                const parentId = "1";

                expect(() => cliEntry.executeCommand(defaultArgs.concat(["complete", parentId]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["c", parentId]))).not.throw(Error);
            });
        });

        describe("interative or i is given", () => {
            it("should accept when extra arg is not given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["interactive"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["i"]))).not.throw(Error);
            });
            it("should accept when -nc is given", () => {
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["interactive", "-nc"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["i", "-nc"]))).not.throw(Error);
            });
        });

        describe("--help or -h is given", () => {
            it("should accept whenever other args are given", () => {
                const unexpectedArgs = ["foo", "bar", "p", "q", "-p", "-q"];

                expect(() => cliEntry.executeCommand(defaultArgs.concat(["--help"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["-h"]))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["--help"], unexpectedArgs))).not.throw(Error);
                expect(() => cliEntry.executeCommand(defaultArgs.concat(["-h"], unexpectedArgs))).not.throw(Error);
            });
        });

        describe("unexpected input is given", () => {
            it("should accept", () => {
                ["foo", "bar", "p", "q", "-p", "-q"].forEach((i) => {
                    let inputs: string[] = [];
                    inputs.push(i);
                    expect(() => cliEntry.executeCommand(defaultArgs.concat(inputs))).not.throw(Error);
                });
            });
        });
    });
});