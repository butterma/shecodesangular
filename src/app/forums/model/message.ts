export class Message {
    _id:String;
    username:String;
    content:String;
    date:Date;
    file:File;
    likes:String[];
    dislikes:String[];

    constructor(_username:String, _content:String, _date:Date, _file:File){
        this.username=_username;
        this.content=_content;
        this.date=_date;
        this.file = _file;
        this.likes = Array();
        this.dislikes = Array();
    }
}


