import Command from "./Command";
import { ListCommand, AddCommand, DeleteCommand, CompleteCommand, OpenNewTaskWithEditorCommand, TaskFuzzyFinderCommand } from "./taskCommands";

export const parseListCommand = (args: string[]): Command => {
    let command = new ListCommand();
    command.args = [];

    if (args.length === 0) {
        return command;
    }

    let filters = {
        ongoing: false,
        deleted: false,
        completed: false
    };
    command.args = [filters];

    if (args.indexOf("-o") !== -1) {
        filters.ongoing =  true;
    }

    if (args.indexOf("-d") !== -1) {
        filters.deleted = true;
    }

    if (args.indexOf("-c") !== -1) {
        filters.completed = true;
    }

    return command;
};

export const parseAddCommand = (args: string[]): Command => {
    if(args.length === 0) {
        return new OpenNewTaskWithEditorCommand();
    }

    let command = new AddCommand();
    command.args = [args.join(" ")];

    return command;
};

export const parseDeleteCommand = (args: string[]): Command => {
    if(args.length === 0){
        return new TaskFuzzyFinderCommand();
    }

    let command = new DeleteCommand();
    command.args = args.map((a) => Number.parseInt(a));

    return command;
};

export const parseCompleteCommand = (args: string[]): Command => {
    if(args.length === 0) {
        return new TaskFuzzyFinderCommand();
    }

    let command = new CompleteCommand();
    command.args = args.map((a) => Number.parseInt(a));

    return command;
};