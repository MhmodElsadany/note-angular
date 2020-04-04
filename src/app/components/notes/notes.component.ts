import { Component, OnInit } from '@angular/core';
import { NotesServicesService } from 'src/app/services/notes-services.service';
import { Notebook } from 'src/app/model/notebook';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
   notebookList : Notebook[]=[];
   notes:Note[]=[];
   selectedNotebook: Notebook;
   searchText: string;
  
  constructor(private service:NotesServicesService) { }

  ngOnInit(): void {
    this.getAllNoteBook();
    this.getAllNotes();
  }


  getAllNoteBook(){

    this.service.getNoteBook().subscribe(
      data => {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");

        this.notebookList=data;
        console.log("kkkkk",  this.notebookList[0].name);
      }
    );

  }

  getAllNotes(){
    this.service.getAllNotes().subscribe(
      res => {
        this.notes = res;
        console.log(this.notes[0].text);
        console.log(this.notes[1].text);
        console.log(this.notes[1].title);


      },
      err => {alert("Error occurred while downloading the notes;")}
    );
  }

  createNotebook() {
    let newNotebook:Notebook = {
      name:'New notebook',
      id:'1'
    };

    this.service.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebookList.push(newNotebook);
      },
      err => {alert("An error has occurred while saving the notebook");}
    );

  }

  updateNotebook(updatedNotebook: Notebook) {
    this.service.postNotebook(updatedNotebook).subscribe(
      res => {

      },
      err => {alert("An error has occurred while saving the notebook");}
    );
  }  
  deleteNotebook(notebook: Notebook) {
    if(confirm("Are you sure you want to delete notebook?")){
      this.service.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebookList.indexOf(notebook);
          this.notebookList.splice(indexOfNotebook,1);
        },
        err => {
          alert("Could not delete notebook");
        }
      );
    }
  }
/////////note operation


deleteNote(note: Note){
  if(confirm("Are you sure you want to delete this note?")){
    this.service.deleteNote(note.id).subscribe(
      res =>{
        let indexOfNote = this.notes.indexOf(note);
        this.notes.splice(indexOfNote, 1);
      },
      err=>{alert("An error has occurred deleting the note");}
    );
  }
}

createNote(notebookId: String) {
  let newNote:Note = {
    id: "1",
    title: "New Note",
    text: "Write some text in here",
    lastModifiedOn: null,
    notebookId: notebookId
  };

  this.service.saveNote(newNote).subscribe(
    res => {
      newNote.id = res.id;
      this.notes.push(newNote);
    },
    err => {alert("An error occurred while saving the note");}
  );
}

selectNotebook(notebook: Notebook) {
  this.selectedNotebook = notebook;
  this.service.getNotesByNotebook(notebook.id).subscribe(
    res=> {
      this.notes = res;
    },
    err =>{alert("An error has occurred while downloading the notes;")}
  );
}

updateNote(updatedNote: Note) {
  this.service.saveNote(updatedNote).subscribe(
    res => {
    },
    err => {alert("An error occurred while saving the note");}
  );
}

selectAllNotes() {
  this.selectedNotebook = null;
  this.getAllNotes();
}

}

