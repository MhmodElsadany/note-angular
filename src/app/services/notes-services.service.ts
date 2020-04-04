import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
import { FeedbackModel } from '../components/feedback/feedback.component';
import { Notebook } from '../model/notebook';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
@Injectable({
  providedIn: 'root'
})
export class NotesServicesService {
  private urlfeedback = 'http://localhost:8081/api/feedback';
  private urlNoteBook ="http://localhost:8081/api/notebooks//all"
  private SAVE_UPDATE_NOTEBOOK="http://localhost:8081/api/notebooks";
  private DELETE_NOTEBOOK_URL="http://localhost:8081/api/notebooks/";
  private ALL_NOTES_URL = "http://localhost:8081/api/notes/all";
  private NOTES_BY_NOTEBOOK_URL = "http://localhost:8081/api/notes/byNotebook/";
  private SAVE_UPDATE_NOTE_URL = `http://localhost:8081/api/notes`;
  private DELETE_NOTE_URL = `http://localhost:8081/api/notes/`;

  constructor(private  http:HttpClient ) { }
  
  saveFeedback(model:FeedbackModel){
  return this.http.post(this.urlfeedback,model);
  }
  getNoteBook(){
    return this.http.get<Notebook[]>(this.urlNoteBook);
    }
    
  postNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK, notebook);
  }

  deleteNotebook(id: String): Observable<any> {
    console.log("jjjjjjjjjjjjjjjjjjjjj");
    console.log(id);

    return this.http.delete(this.DELETE_NOTEBOOK_URL+id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotesByNotebook(notebookId: String): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }

  saveNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }

  deleteNote(noteId:String):Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + noteId);
  }

}
