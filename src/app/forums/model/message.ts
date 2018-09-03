export class Message {
    username:String;
    content:String;
    date:Date;
    file:File;
    like:String[];
    unLike:String[];

    constructor(_username:String, _content:String, _date:Date, _file:File){
        this.username=_username;
        this.content=_content;
        this.date=_date;
        this.file = _file;
        this.like = Array();
        this.unLike = Array();
    }
}


