import { expect } from "chai";
import { sandbox, spy } from "sinon";
import Command, { ExecutorNotFound } from "../../src/command/Command";

class TestCommand extends Command {
    protected getRunnableName(): string {
        return "testMethod";
    }

    public testMethod(echo:string) { return echo; }
}

const testSandbox = sandbox.create();

describe("Command", () => {
    let testCommand: Command;

    beforeEach(() => {
        testCommand = new TestCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        it("should throw an error when executor is not given", () => {
            expect(testCommand.execute.bind(testCommand)).to.throw(ExecutorNotFound);
        });

        it("should call its method 'testMethod' when itself is given as the executor", () => {
            const methodSpy = testSandbox.spy(testCommand, "testMethod");
            testCommand.executor = testCommand;
            testCommand.execute();

            expect(methodSpy.called).to.be.true;
        });
    });
});