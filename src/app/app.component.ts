import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-listing';
  search: boolean = false;
  isLoading=false;
  page: number = 1;
  counter=0;
  totalPage = 0;
  searchStr = "";
  movies = [];
  config = {
    id: "1",
    totalItems: 0,
    itemsPerPage: 20,
    currentPage: 1
  };
  movieList: Observable<object[]>;
  pageOfItems: Array<any>;
  constructor(private movieService: MovieListService) {

  }

  ngOnInit() {
    this.getMovies(this.page);
  }

  getMovies(page) {
    if (this.searchStr.length <= 0) {
      this.isLoading=true;
      this.movieList = this.movieService.getMovies(page).pipe(tap(res => {
        if (this.config.totalItems <= 0) {
          this.config.totalItems = res["total_results"];
        }
        this.config.currentPage = page;
        console.log("total page" + this.config.totalItems);
        console.log(res["total_pages"]);
      }), map(
        (res) => {
          this.isLoading=false;
          console.log(res["results"])
          return res["results"]
        })
      )
    }
  }
  getImage(posterPath) {
    let imagePath = "/assets/images/image-not-available.png";
    if (posterPath != null) {
      imagePath = "https://image.tmdb.org/t/p/w500" + posterPath;
    }
    return imagePath;
  }
  searchMovies(page) {
    if (this.searchStr.length > 0) {
      if(this.counter==0){
          this.config.currentPage=1;
          this.counter++;
      }
      this.isLoading=true;
      this.search = true
      this.movieList = this.movieService.getMoviesBySearch(this.searchStr,page).pipe(tap((res) => {
        this.totalPage=res["total_results"];
        this.config.totalItems = res["total_results"];
        this.config.currentPage=page;
      }), map(res => {
        this.isLoading=false;
        return res["results"];
      }))
    }
    else {
      this.config.totalItems = 0;
      this.counter==0;
      this.search=false;
      this.getMovies(1);
    }
  }
  changePage(event) {
    console.log(event);
    if (this.search)
      this.searchMovies(event);
    else
      this.getMovies(event);
    this.page = event;
  }
}

