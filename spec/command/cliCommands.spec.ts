import { expect } from "chai";
import { sandbox, spy } from "sinon";
import Command from "../../src/command/Command";
import { HelpCommand, InteractiveModeCommand } from "../../src/command/cliCommands";

const testSandbox = sandbox.create();

describe("HelpCommand", () => {
    let helpCommand: Command;

    beforeEach(() => {
        helpCommand = new HelpCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        it("should call its method 'getHelpMessage'", () => {
            const methodSpy = testSandbox.spy(helpCommand, "getHelpMessage");
            helpCommand.execute(helpCommand);

            expect(methodSpy.called).to.be.true;
        });
    });
});

describe("InteractiveModeCommand", () => {
    let interactiveModeCommand: Command;

    beforeEach(() => {
        interactiveModeCommand = new InteractiveModeCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        it("shoud call its method 'interactiveMode'", () => {
            const methodSpy = testSandbox.spy(interactiveModeCommand, "interactiveMode");
            interactiveModeCommand.execute(interactiveModeCommand);

            expect(methodSpy.called).to.be.true;
        });
    });
});