import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }

  apiKey = "7040abd7cc4eda50581ff2e3f5d72f9e";
  url = "https://api.themoviedb.org/4/list/1?";

  getMovies(page:number) {
    return this.http.get(this.url +"page="+page.toString()+ "&api_key=" + this.apiKey);
  }
  getMoviesByPage(page:number) {
    return this.http.get(this.url +"page="+page.toString()+ "&api_key=" + this.apiKey);
  }
  
  getMoviesBySearch(movieName:string,page:number){
    return this.http.get("https://api.themoviedb.org/3/search/movie?api_key=7040abd7cc4eda50581ff2e3f5d72f9e&language=en-US&query="+movieName+"&page="+page+"&include_adult=false");
  }

}
