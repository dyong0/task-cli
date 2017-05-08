import { expect } from "chai";
import { sandbox, spy } from "sinon";
import Command from "../../src/command/Command";
import { ListCommand, AddCommand, DeleteCommand, CompleteCommand, OpenNewTaskWithEditorCommand } from "../../src/command/taskCommands";
import { taskService } from "../../src/task/TaskService";
import * as child_process from "child_process";
import { editorPath, newTaskFilePath } from "../../src/settings";

const testSandbox = sandbox.create();

describe("ListCommand", () => {
    let listCommand: Command;

    beforeEach(() => {
        listCommand = new ListCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        it("shoud call the method of taskService 'getTaskListFormatted'", () => {
            const methodSpy = testSandbox.spy(taskService, "getTaskListFormatted");
            listCommand.execute(taskService);

            expect(methodSpy.called).to.be.true;
            expect(methodSpy.alwaysCalledOn(taskService)).to.be.true;
        });
    });
});

describe("AddCommand", () => {
    let addCommand: Command;

    beforeEach(() => {
        addCommand = new AddCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        context("when plain text is given", () => {
            it("shoud call the method of taskService 'addTask'", () => {
                const methodSpy = testSandbox.spy(taskService, "addTask");
                addCommand.args = ["task name"];
                addCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
                expect(methodSpy.alwaysCalledOn(taskService)).to.be.true;
            });
        });
    });
});

describe("DeleteCommand", () => {
    let deleteCommand: Command;

    beforeEach(() => {
        deleteCommand = new DeleteCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        context("when single task id is given", () => {
            it("shoud call the method of taskService 'deleteTask'", () => {
                const methodSpy = testSandbox.spy(taskService, "deleteTask");
                deleteCommand.args = [1];
                deleteCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
            });
        });

        context("when multiple task ids are given", () => {
            it("shoud call the method of taskService 'deleteTasks'", () => {
                const methodSpy = testSandbox.spy(taskService, "deleteTasks");
                deleteCommand.args = [1, 2, 3];
                deleteCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
            });
        });
    });
});

describe("CompleteCommand", () => {
    let completeCommand: Command;

    beforeEach(() => {
        completeCommand = new CompleteCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        context("when single task id is given", () => {
            it("shoud call the method of taskService 'completeTask'", () => {
                const methodSpy = testSandbox.spy(taskService, "completeTask");
                completeCommand.args = [1];
                completeCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
            });
        });

        context("when multiple task ids are given", () => {
            it("shoud call the method of taskService 'completeTasks'", () => {
                const methodSpy = testSandbox.spy(taskService, "completeTasks");
                completeCommand.args = [1, 2, 3];
                completeCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
            });
        });
    });
});

describe("OpenNewTaskWithEditorCommand", () => {
    let command: OpenNewTaskWithEditorCommand;

    beforeEach(() => {
        command = new OpenNewTaskWithEditorCommand();
    });

    afterEach(function () {
        testSandbox.restore();
    });

    describe("#execute()", () => {
        it("shoud call its method 'openNewTaskWithEditor'", () => {
            const methodSpy = testSandbox.spy(command, "openNewTaskWithEditor");
            command.execute(command);

            expect(methodSpy.called).to.be.true;
            expect(methodSpy.alwaysCalledOn(command)).to.be.true;
        });

        it("should return a promise'", () => {
            const methodSpy = testSandbox.spy(command, "openNewTaskWithEditor");
            command.execute(command);

            expect(methodSpy.returnValues.every((r) => r instanceof Promise)).to.be.true;
        });
    });

    describe("#openNewTaskWithEditor", () => {
        it("should spawn an editor process editing a new task file", () => {
            const spawnSync = testSandbox.spy(child_process, "spawnSync");
            command.execute(command);

            expect(spawnSync.calledWith(editorPath, [newTaskFilePath])).to.be.true;
        });
    });
});