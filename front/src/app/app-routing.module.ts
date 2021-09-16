import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { SongFormComponent } from './song-form/song-form.component';
import { SingleSongComponent } from './single-song/single-song.component';

const routes: Routes = [
  { path: 'songs', component: SongListComponent},
  { path: 'song/:id', component: SingleSongComponent },
  { path: 'new-song', component: SongFormComponent},
  { path: 'modify-song/:id', component: SongFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'songs'},
  { path: '**', redirectTo: 'songs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
