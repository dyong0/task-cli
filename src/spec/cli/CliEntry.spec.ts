import CliEntry from "../../cli/CliEntry";
import { expect } from "chai";

describe("CliEntry", () => {
    describe("#inputCommand()", () => {
        describe("#no arg", () => {
            it("should display the current task list");
        });

        describe("#list or l", () => {
            it("should display the ongoing task list when nothing given");
            it("should display the ongoing task list when -o is given");
            it("should display the completed task list when -c is given");
            it("should display the deleted task list when -d is given");
        });

        describe("#add or a", () => {
            context("when any arg is not given", () => {
                it("should open a new task file with the default editor");
                it("should add a todo with a new task file when valid");
                it("should ask for editing the new task file when invalid");
            });

            context("when some args are given", () => {
                it("should add a task when a plain text is given");
                it("should add a dependent task when a valid parent id is given");
            });
        });

        describe("#delete or d", () => {
            context("when any arg is not givne", () => {
                it("should open a fuzzy task finder");
            });

            context("when a task id is given", () => {
                it("should delete a task when existing");
                it("should fail when nonexistent");
            });
        });

        describe("#complete or c", () => {
            context("when any arg is not givne", () => {
                it("should open a fuzzy task finder");
            });

            context("when a task id is given", () => {
                it("should complete a task when existing");
                it("should fail when nonexistent");
            });
        });

        describe("#interative or i", () => {
            it("should display interative mode");
            it("should display interative mode without command help when -nc is given");
        });

        describe("#--help or -h", () => {
            it("should display a short manual");
        });
    });
});