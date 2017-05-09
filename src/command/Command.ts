// Command gathers a method name and parameters of a class instance
// and it calls the method via its run() method
export class ExecutorNotFound extends Error{
    constructor() {
        super("executor is not found");
    }
}
export default abstract class Command {
    executor: any;
    args: {}[] = [];

    protected abstract getRunnableName(): string;

    execute(): {} {
        if(typeof this.executor === "undefined" || this.executor === null) {
            throw new ExecutorNotFound();
        }

        const runnable = this.executor[this.getRunnableName()];
        return runnable.apply(this.executor, this.args);
    }
}