import * as path from "path";
import * as fs from "fs";
import * as stream from "stream";

export const isTestEnvironment = () => process.env.NODE_ENV.toLowerCase() === "test";
export const isDevelopEnvironment = () => process.env.NODE_ENV.toLowerCase() === "dev";
export const isProductionEnvironment = () => process.env.NODE_ENV.toLowerCase() === "prod";

class EnvironmentNotFound extends Error{
    constructor() {
        super("Environment is not found");
    }
}

export const appRoot = path.resolve(__dirname);
export const resourceDir = appRoot + "/../resource";

export const encoding = "utf8";

const helpMessageFilePath = resourceDir + "/helpMessage.txt";
export const helpMessage = (() => fs.readFileSync(helpMessageFilePath, exports.encoding))();

export const outStream = (() => {
    console.log(process.env.NODE_ENV);
    let dummyWritable = new stream.Writable();
        dummyWritable._write = (chunk, enc, cb) => {
            //doesn't write at all
            cb();
        };

    if(isTestEnvironment()) {
        return dummyWritable;
    }

    if(isDevelopEnvironment()) {
        return dummyWritable;
    }

    if(isProductionEnvironment()) {
        return process.stdout;
    }

    throw new EnvironmentNotFound();
})();

export const editorPath = "$EDITOR";

export const newTaskFilePath = "/tmp/new.task";