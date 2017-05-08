import Command from "./Command";

export default abstract class AsyncCommand<T> extends Command {
    execute(executor: any): Promise<T> {
        const runnable = executor[this.getRunnableName()];
        return runnable.apply(executor, this.args);
    }
}