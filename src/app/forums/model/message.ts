export class Message {
    _id:String;
    username:String;
    content:String;
    date:Date;
    file:File;
    fileName:String;
    likes:String[];
    dislikes:String[];

    constructor(_username:String, _content:String, _date:Date, _file:File, _fileName:String){
        this.username=_username;
        this.content=_content;
        this.date=_date;
        this.file = _file;
        this.fileName = _fileName;
        this.likes = Array();
        this.dislikes = Array();
    }
}


