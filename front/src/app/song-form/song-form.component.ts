import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../services/songs.service';
import { Song } from '../models/Song.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit {

  songForm: FormGroup;
  mode: string;
  loading: boolean;
  song: Song;
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private songs: SongsService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.songs.getSongById(params.id).then(
            (song: Song) => {
              this.song = song;
              this.initModifyForm(song);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.songForm = this.formBuilder.group({
      genre: [null, Validators.required],
      titre: [null, Validators.required],
      auteur: [null, Validators.required],
      duree: [0, Validators.required],

    });

  }

  initModifyForm(song: Song) {
    this.songForm = this.formBuilder.group({
      genre: [this.song.genre, Validators.required],
      titre: [this.song.titre, Validators.required],
      auteur: [this.song.auteur, Validators.required],
      duree: [this.song.duree, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const newSong = new Song();
    newSong.genre = this.songForm.get('genre').value;
    newSong.titre = this.songForm.get('titre').value;
    newSong.duree = this.songForm.get('duree').value;
    newSong.auteur = this.songForm.get('auteur').value;
    if (this.mode === 'new') {
      this.songs.createSong(newSong).then(
        () => {
          this.loading = false;
          this.router.navigate(['/songs']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    } else if (this.mode === 'edit') {
      this.songs.modifySong(this.song.id, newSong).then(
        () => {
          this.loading = false;
          this.router.navigate(['/songs']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    }
  }
}
