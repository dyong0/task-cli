import { expect } from "chai";
import { sandbox, spy } from "sinon";
import Command from "../../src/command/Command";
import { ListCommand, AddCommand, DeleteCommand, CompleteCommand } from "../../src/command/taskCommands";
import { taskService } from "../../src/task/TaskService";

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

        context("when plain text and extra parameters are given", () => {
            it("shoud call the method of taskService 'addTask'", () => {
                const methodSpy = testSandbox.spy(taskService, "addTask");
                addCommand.args = ["task name", 1];
                addCommand.execute(taskService);

                expect(methodSpy.called).to.be.true;
                expect(methodSpy.alwaysCalledOn(taskService)).to.be.true;
            });
        });

        context("when anything is not given", () => {
            it("should call its method addTaskAsync");
            it("should call the method of taskService 'addTask'");
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