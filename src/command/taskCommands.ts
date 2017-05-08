import Command from "./Command";
import { TaskService, taskService } from "../task/TaskService";

export class ListCommand extends Command {
    protected getRunnableName(): string {
        return "getTaskListFormatted";
    }

    execute(executor: TaskService): string {
        super.execute(executor);
        return "";
    }
}
export class AddCommand extends Command {
    protected getRunnableName(): string {
        return "addTask";
    }

    execute(executor: TaskService): string {
        super.execute(executor);
        return "";
    }
}
export class DeleteCommand extends Command {
    protected getRunnableName(): string {
        if (this.args.length > 1) {
            return "deleteTasks";
        }

        return "deleteTask";
    }

    execute(executor: TaskService): string {
        super.execute(executor);
        return "";
    }
}
export class CompleteCommand extends Command {
    protected getRunnableName(): string {
        if (this.args.length > 1) {
            return "completeTasks";
        }

        return "completeTask";
    }

    execute(executor: TaskService): string {
        super.execute(executor);
        return "";
    }
}