import { Config } from "../../shared/config";
import { Item } from "./item-model";
import { Push } from "kinvey-nativescript-sdk/push";  
import { File } from "file-system";
import { Kinvey } from "kinvey-nativescript-sdk";

const editableProperties = [
    "ItemNum",
    "ItemName",
    "Manufacturer",
    "ManufacturerSKU",
    "VendorSKU",
    "Price",
    "MinQty",
    "Category1",
    "Category1",
    "Detail1",
    "Detail2",
    "Detail3",
    "ImageURL",
    "Weight",
    "OnHand"
];

export class ItemService {
    static getInstance(): ItemService {
        return ItemService._instance;
    }

    private static _instance: ItemService = new ItemService();

    private static cloneUpdateModel(item: Item): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = item[e], a), { _id: item.id });
    }

    private allItems: Array<Item> = [];
    private itemsStore = Kinvey.DataStore.collection<any>("ItemData");

    constructor() {
        if (ItemService._instance) {
            throw new Error("Use ItemService.getInstance() instead of new.");
        }

        ItemService._instance = this;
    }

    load(): Promise<any> {
        console.log("Item service load called");
        return this.login().then(() => {
        // adding logic to subscribe to push notification
        Push.register({
            android: {
            senderID: '390861799348'
            },
            ios: {
            alert: true,
            badge: true,
            sound: true
            }
        })
        .then((deviceToken: string) => {
            //alert("Device registered.  Access token: " + deviceToken);
            //console.log("Device registered.  Access token: " + deviceToken);
        })
        .catch((error: Error) => {
            alert("Error: " + error);
            console.log("Error: " + error);
        });


            return this.itemsStore.sync();
        }).catch((error) => {
            console.log("ERROR = " + error);
        }).then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("ItemNum");
            const stream = this.itemsStore.find(sortByNameQuery);
            return stream.toPromise();
        }).then((data) => {
            this.allItems = [];
            data.forEach((itemData: any) => {
                itemData.id = itemData._id;
                const item = new Item(itemData);
                this.allItems.push(item);
            });
            return this.allItems;
        });
    }

    update(itemModel: Item): Promise<any> {
        const updateModel = ItemService.cloneUpdateModel(itemModel);

        return this.itemsStore.save(updateModel);
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
