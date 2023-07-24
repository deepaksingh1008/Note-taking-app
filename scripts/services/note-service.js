// crud operation perform here
//export default use only one time in a file
//export use multiple time in a file
import {Note} from '../models/note.js'
export const noteOperation = {
        notes:[],
        add(noteObject){
         const note = new Note(noteObject); 
         this.notes.push(note);
          
        },
        searchById(id){
            return this.notes.find(note=>note.id==id);
          },
         toggleMark(id){
            //  const noteObject = this.searchById(id);
            //  noteObject.isMarked=!noteObject.isMarked;
            this.searchById(id).toggleMark();
         },
        total(){
            return this.notes.length;
        },
        mark(){

            return this.notes.filter(note=>note.isMarked).length;
        },
        unmark(){
            return this.total() - this.mark();
        },
        deleteOneItem(id){
            console.log(id);
            // this.notes = this.notes.filter(e=>e.id!=id);
            console.log(this.notes)
        //     console.log(this.notes.length);
        },
        getNotes(){
              return this.notes;
        },
        remove(){
            this.notes = this.notes.filter(note=>!note.isMarked);
        },
        sortNotesById(id){
            console.log(id);
            if(id=='a'){
                console.log(id);
                this.notes.sort((a,b)=>{
                    return parseInt(a.id) - parseInt(b.id);
                });
            }
            else{
                this.notes.sort((a,b)=>{
                    return parseInt(b.id) - parseInt(a.id);
                });
            }
           
        },
        sortNotes(id,typ){
        if(id=='a'){
        this.notes.sort((a, b) => {
            let fa = a[typ].toLowerCase(),
             fb = b[typ].toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    }
    else{
        this.notes.sort((a, b) => {
            let fa = a.id.toLowerCase(),
             fb = b.id.toLowerCase();
        
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
    })
        }
    },
    searchByIndex(obj){
        return this.notes.indexOf(obj);
    },
    updateData(index,obj){
       this.notes.splice(index,1,obj);
       console.log(this.notes);
    }   
       
}
