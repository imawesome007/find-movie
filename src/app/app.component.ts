import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-listing';
  p:any;
  searchStr = "";
  movieList = [];
  pageOfItems: Array<any>;
  constructor(private movieService: MovieListService) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    if (this.searchStr.length <=0) {
      this.movieService.getMovies().subscribe((res) => {
        this.movieList = res["results"];
        console.log(res["results"]);
      });
    }
  }

  getImage(posterPath) {
    let imagePath = "https://image.tmdb.org/t/p/w500" + posterPath;
    return imagePath;
  }
   searchMovies(){
    if (this.searchStr.length > 0) {
      this.movieService.getMoviesBySeearch(this.searchStr).subscribe((res)=>{
        this.movieList = res["results"];
        console.log(res["results"]);
      })
    }
    else{
      this.getMovies();
    }
  }


}

