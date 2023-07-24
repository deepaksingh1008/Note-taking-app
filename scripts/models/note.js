//ES6
export class Note{  //when we write export here the its make new object send to imported file
    constructor(noteObject){
        for(let key in noteObject){
            this[key]=noteObject[key];
        }
        this.isMarked=false;
    }
    toggleMark(){
        this.isMarked=!this.isMarked;
    }
}

//export default Note; //it send the original object

