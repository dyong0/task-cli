import Command from "./Command";
import { ListCommand, AddCommand, DeleteCommand, CompleteCommand } from "./taskCommands";

export const parseListCommand = (args: string[]): Command => {
    let command = new ListCommand();
    return command;
};

export const parseAddCommand = (args: string[]): Command => {
    let command = new AddCommand();
    return command;
};

export const parseDeleteCommand = (args: string[]): Command => {
    let command = new DeleteCommand();
    return command;
};

export const parseCompleteCommand = (args: string[]): Command => {
    let command = new CompleteCommand();
    return command;
};