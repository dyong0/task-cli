import Command from "./Command";

export default abstract class AsyncCommand<T> extends Command {
    execute(): Promise<T> {
        const runnable = this.executor[this.getRunnableName()];
        return runnable.apply(this.executor, this.args);
    }
}