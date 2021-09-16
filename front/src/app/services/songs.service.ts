import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from '../models/Song.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  songs$ = new Subject<Song[]>();

  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getSongs() {
    this.http.get('http://localhost:3000/api/songs').subscribe(
      (songs: Song[]) => {
        this.songs$.next(songs);
      },
      (error) => {
        this.songs$.next([]);
        console.error(error);
      }
    );
  }

  getSongById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/songs/' + id).subscribe(
        (song: Song) => {
          resolve(song);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  createSong(song: Song) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/songs', song).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifySong(id: string, song: Song) {
    return new Promise((resolve, reject) => {
        this.http.put('http://localhost:3000/api/songs/' + id, song).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  deleteSong(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/songs/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
