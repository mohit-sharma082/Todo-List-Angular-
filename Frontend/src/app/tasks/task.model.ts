export interface Task {
    _id: string;
    title : string;
    description : string;
    imagePath : string;
    creator: string;

    // additional feature
    time: string;
}
