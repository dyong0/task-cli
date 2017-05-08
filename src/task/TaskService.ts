import Task from "./Task";
import { taskFormatters, TaskFormatter } from "./TaskFormatter";

export class TaskService {
    private tasks: Task[];
    private formatter: TaskFormatter;

    constructor() {
        this.tasks = [];
        this.formatter = taskFormatters.simple;
    }

    getTaskListFormatted(): string {
        return "";
    }

    addTask(description:number, parentTaskId?:number): Task {
        let newTask = new Task();
        return newTask;
    }

    deleteTask(taskId:number): number {
        return taskId;
    }

    deleteTasks(taskIds:number[]): number[] {
        return taskIds;
    }

    completeTask(taskId:number): number {
        return taskId;
    }

    completeTasks(taskIds:number[]): number[] {
        return taskIds;
    }
}

export const taskService = new TaskService();