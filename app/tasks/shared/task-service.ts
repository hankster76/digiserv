import { Config } from "../../shared/config";
import { Task } from "./task-model";
import { Push } from "kinvey-nativescript-sdk/push";  
import { File } from "file-system";
import { Kinvey } from "kinvey-nativescript-sdk";

const editableProperties = [
    "TechNum",
    "ServiceType",
    "ServiceDate",
    "PartNum",
    "CustNum",
    "CustName",
    "Address",
    "City",
    "State",
    "Zip",
    "Phone",
    "Email"
];

export class TaskService {
    static getInstance(): TaskService {
        return TaskService._instance;
    }

    private static _instance: TaskService = new TaskService();

    private static cloneUpdateModel(task: Task): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = task[e], a), { _id: task.id });
    }

    private allTasks: Array<Task> = [];
    private taskStore = Kinvey.DataStore.collection<any>("ServiceTasks");

    constructor() {
        if (TaskService._instance) {
            throw new Error("Use TaskService.getInstance() instead of new.");
        }

        TaskService._instance = this;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            //console.log("in load");
            return this.taskStore.sync();
        }).catch((error) => {
            console.log("ERROR = " + error);
        }).then(() => {
            //console.log(".find");
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("TechNum");
            const stream = this.taskStore.find(sortByNameQuery);
            return stream.toPromise();
        }).then((data) => {
            this.allTasks = [];
            data.forEach((taskData: any) => {
                taskData.id = taskData._id;
                const item = new Task(taskData);
                this.allTasks.push(taskData);
            });
            return this.allTasks;
        });
    }

    update(taskModel: Task): Promise<any> {
        const updateModel = TaskService.cloneUpdateModel(taskModel);

        return this.taskStore.save(updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();

        const metadata = {
            filename: imageFile.name,
            mimeType: this.getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };

        return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile: any) => {
                const query = new Kinvey.Query();
                query.equalTo("_id", uploadedFile._id);

                return Kinvey.Files.find(query);
            })
            .then((files: Array<any>) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;

                    return file;
                } else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
            });
    }

    private login(): Promise<any> {
        if (!!Kinvey.User.getActiveUser()) {
            return Promise.resolve();
        } else {
            return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}
