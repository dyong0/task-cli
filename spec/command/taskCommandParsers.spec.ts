import { expect } from "chai";
import { sandbox, spy } from "sinon";
import { parseListCommand, parseCompleteCommand, parseDeleteCommand, parseAddCommand } from "../../src/command/taskCommandParsers";
import { ListCommand, CompleteCommand, AddCommand, DeleteCommand, OpenNewTaskWithEditorCommand, TaskFuzzyFinderCommand } from "../../src/command/taskCommands";

describe("parseListCommand", () => {
    context("when any parameter is not given", () => {
        it("should return an instance of ListCommand with empty args", () => {
            const returned = parseListCommand([]);
            expect(returned).to.be.instanceof(ListCommand);
            expect(returned.args).to.be.empty;
        });
    });

    context("when -o parameter is given", () => {
        it("should return an instance of ListCommand with ongoing:true", () => {
            const returned = parseListCommand(["-o"]);
            expect(returned).to.be.instanceof(ListCommand);
            expect(returned.args).to.have.length(1);
            expect(returned.args[0]).to.have.property("ongoing", true);
        });
    });

    context("when -d parameter is given", () => {
        it("should return an instance of ListCommand with deleted:true", () => {
            const returned = parseListCommand(["-d"]);
            expect(returned.args).to.have.length(1);
            expect(returned.args[0]).to.have.property("deleted", true);
        });
    });

    context("when -c parameter is given", () => {
        it("should return an instance of ListCommand with completed:true", () => {
            const returned = parseListCommand(["-c"]);
            expect(returned).to.be.instanceof(ListCommand);
            expect(returned.args).to.have.length(1);
            expect(returned.args[0]).to.have.property("completed", true);
        });
    });
});

describe("parseAddCommand", () => {
    context("when any parameter is not given", () => {
        it("should return an instance of OpenNewTaskWithEditorCommand", () => {
            const returned = parseAddCommand([]);
            expect(returned).to.be.instanceof(OpenNewTaskWithEditorCommand);
            expect(returned.args).to.be.empty;
        });
    });

    context("when some parameters are given", () => {
        context("when any option is not included", () => {
            it("should return an instance of AddCommand with a task name", () => {
                expect(parseAddCommand(["foo"])).to.be.instanceof(AddCommand);
                expect(parseAddCommand(["foo"]).args).to.be.eql(["foo"]);
                expect(parseAddCommand(["foo", "bar"]).args).to.be.eql([["foo", "bar"].join(" ")]);
                expect(parseAddCommand(["foo", "bar", "zoo"]).args).to.be.eql([["foo", "bar", "zoo"].join(" ")]);
            });
        });
    });
});

describe("parseDeleteCommand", () => {
    context("when any parameter is not given", () => {
        it("should return an instance of TaskFuzzyFinderCommand with empty args", () => {
            const returned = parseDeleteCommand([]);
            expect(returned).to.be.instanceof(TaskFuzzyFinderCommand);
            expect(returned.args).to.be.empty;
        });
    });

    context("when some parameters are given", () => {
        it("should return an instance of DeleteCommand with task ids", () => {
            const returned = parseDeleteCommand(["1", "2", "3"]);

            expect(parseDeleteCommand(["1", "2", "3"])).to.be.instanceof(DeleteCommand);

            expect(parseDeleteCommand(["1", "2", "3"]).args).to.be.eql([1, 2, 3]);
            expect(parseDeleteCommand(["1", "2"]).args).to.be.eql([1, 2]);
            expect(parseDeleteCommand(["1"]).args).to.be.eql([1]);
        });
    });
});

describe("parseCompleteCommand", () => {
    context("when any parameter is not given", () => {
        it("should return an instance of TaskFuzzyFinderCommand with empty args", () => {
            const returned = parseCompleteCommand([]);
            expect(returned).to.be.instanceof(TaskFuzzyFinderCommand);
            expect(returned.args).to.be.empty;
        });
    });

    context("when some parameters are given", () => {
        it("should return an instance of CompleteCommand with task ids", () => {
            const returned = parseCompleteCommand(["1", "2", "3"]);

            expect(parseCompleteCommand(["1", "2", "3"])).to.be.instanceof(CompleteCommand);

            expect(parseCompleteCommand(["1", "2", "3"]).args).to.be.eql([1, 2, 3]);
            expect(parseCompleteCommand(["1", "2"]).args).to.be.eql([1, 2]);
            expect(parseCompleteCommand(["1"]).args).to.be.eql([1]);
        });
    });
});