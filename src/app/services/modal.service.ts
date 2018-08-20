/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})*/
export class ModalService {

  private modals: any[]=[];

  add(modal:any){
    this.modals.push(modal);
  }

  remove(id:string){
    this.modals=this.modals.filter(x=>x.id!==id);
  }

  open(id:string){
    console.log("in modal.service.open "+this.modals.length+" "+id);
    console.log("modal id: "+this.modals[0].id);
    let modal: any=this.modals.filter(x=>x.id===id)[0];
    modal.open();
  }

  close(id:string){
    let modal:any=this.modals.filter(x=>x.id===id)[0];
    modal.close();
  }
  constructor() { }
}
