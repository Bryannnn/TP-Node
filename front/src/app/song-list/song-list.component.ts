import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { Subscription } from 'rxjs';
import { Song } from '../models/Song.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songSub: Subscription;
  songs: Song[];
  loading: boolean;
  errorMsg: string;

  constructor(private song: SongsService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.songSub = this.song.songs$.subscribe(
      (songs) => {
        this.songs = songs;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.song.getSongs();
  }

  onClickSong(id: string) {
    this.router.navigate(['song', id]);
  }

}
