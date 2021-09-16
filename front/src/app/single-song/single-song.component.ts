import { Component, OnInit } from '@angular/core';
import { Song } from '../models/Song.model';
import { SongsService } from '../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-song',
  templateUrl: './single-song.component.html',
  styleUrls: ['./single-song.component.scss']
})
export class SingleSongComponent implements OnInit {

  loading: boolean;
  song: Song;
  userId: string;
  likePending: boolean;
  liked: boolean;
  disliked: boolean;
  errorMessage: string;

  constructor(private songs: SongsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.songs.getSongById(params.id).then(
          (song: Song) => {
            this.song = song;
            this.loading = false;
          }
        );
      }
    );

  }


  onBack() {
    this.router.navigate(['/songs']);
  }

  onModify() {
    this.router.navigate(['/modify-song', this.song.id]);
  }

  onDelete() {
    this.loading = true;
    this.songs.deleteSong(this.song.id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/songs']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }
}
