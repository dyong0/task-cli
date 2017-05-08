// Command gathers a method name and parameters of a class instance
// and it calls the method via its run() method
export default abstract class Command {
    args: {}[] = [];

    protected abstract getRunnableName(): string;

    execute(executor: any): {} {
        const runnable = executor[this.getRunnableName()];
        return runnable.apply(executor, this.args);
    }
}