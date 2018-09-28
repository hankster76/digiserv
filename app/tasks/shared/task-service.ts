import { Config } from "../../shared/config";
import { Task } from "./task-model";
import { Push } from "kinvey-nativescript-sdk/push";  
import { File } from "file-system";
import { Kinvey } from "kinvey-nativescript-sdk";

const editableProperties = [
    "status",
    "tech_id",
    "address",
    "city",
    "state",
    "zip",
    "date",
    "cellphone",
    "email",
    "custName",
    "custID"
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
    private taskStore = Kinvey.DataStore.collection<any>("appointments");

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
            sortByNameQuery.ascending("tech_id");
            const stream = this.taskStore.find(sortByNameQuery);
            return stream.toPromise();
        }).then((data) => {
            this.allTasks = [];
            data.forEach((taskData: any) => {
                taskData.id = taskData.id;
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

    private login(): Promise<any> {
        if (!!Kinvey.User.getActiveUser()) {
            return Promise.resolve();
        } else {
            return Kinvey.User.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }
}
