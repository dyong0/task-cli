import Command from "./Command";
import { helpMessage } from "../settings";

export class HelpCommand extends Command {
    protected getRunnableName(): string {
        return "getHelpMessage";
    }

    public getHelpMessage(): string {
        return helpMessage;
    }
}

export class InteractiveModeCommand extends Command {
    protected getRunnableName(): string {
        return "interactiveMode";
    }

    public interactiveMode(): string {
        return "";
    }
}