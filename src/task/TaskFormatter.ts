import Task from "./Task";

export interface TaskFormatter {
    format(task: Task): string;
    formatList(tasks: Task[]): string;
}

class SimpleTaskFormatter {
    format(): string {
        return ""; //TODO
    }

    formatList(): string {
        return ""; //TODO
    }
}

const simpleTaskFormatter = new SimpleTaskFormatter();

export const taskFormatters = {
    simple: simpleTaskFormatter
};