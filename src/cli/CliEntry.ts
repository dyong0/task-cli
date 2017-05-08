import Command from "../command/Command";
import { parseListCommand, parseAddCommand, parseDeleteCommand, parseCompleteCommand } from "../command/taskCommandParsers";
import { HelpCommand, InteractiveModeCommand } from "../command/cliCommands";
import { taskService } from "../task/TaskService";
import { outStream } from "../settings";

export class CliEntry {
    private out: NodeJS.WritableStream;

    constructor(out: NodeJS.WritableStream) {
        this.out = out;
    }

    // args[0] is the name of this application
    executeCommand(args: string[]) {
        let command: Command;
        let executor: any = taskService;

        if (args.length === 1) {
            return parseListCommand([]);
        }

        switch (args[1]) {
            case "--help":
            case "-h":
                command = new HelpCommand();
                executor = command;
                break;
            case "list":
            case "l":
                command = parseListCommand(args.slice(1));
                break;
            case "add":
            case "a":
                command = parseAddCommand(args.slice(1));
                break;
            case "delete":
            case "d":
                command = parseDeleteCommand(args.slice(1));
                break;
            case "interactive":
            case "i":
                command = new InteractiveModeCommand();
                executor = command;
                break;
            case "complete":
            case "c":
                command = parseCompleteCommand(args.slice(1));
                break;
            default:
                command = new HelpCommand();
                executor = command;
                break;
        }

        this.out.write(command.execute(executor).toString());
    }
}

export const cliEntry = new CliEntry(outStream);