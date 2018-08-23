export class Message {
    username:String;
    content:String;
    date:Date;
    like:String[];
    unLike:String[];

    constructor(_username:String, _content:String, _date:Date){
        this.username=_username;
        this.content=_content;
        this.date=_date;
    }
}


