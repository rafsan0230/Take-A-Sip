import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Foods!: any;
  title = 'What can we get for you?';
  subtitle = '';

  

  constructor (private foodService: FoodService,private route: Router, private http: HttpClient) {}

  // getFoods() {
  //   return this.http.get(this.foodtypeURL);
  // }

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const getting = this.foodService.getFoods();
    if (getting) {
      getting.subscribe((response) => {
        console.log("food service", response);
        this.Foods = response;
      });
    }
  }
}
