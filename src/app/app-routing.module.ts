import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const routes: Routes = [ 
  {path :'notes' , component: NotesComponent}
    , {path : 'feedback' , component : FeedbackComponent}
    ,{path : '' ,component:NotesComponent ,pathMatch : 'full'}
    ,  {path : '**' , component : NotfoundComponent
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
