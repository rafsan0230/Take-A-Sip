import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FOODS } from '../interfaces/food-types';
import { Food } from '../interfaces/food';
import { SelectedFoodAttribute } from '../interfaces/selectedFoodAttribute';
import { OrderList } from '../interfaces/orderlist';

import { HttpClient } from '@angular/common/http'
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url = 'http://localhost:6789/orders';  
  
  listItems: Food[] = [];
  selectedAttribute:  SelectedFoodAttribute[] = [];

  constructor(private http: HttpClient) { }

  /*Data passing with Api*/
  getAllOrders(): Observable<OrderList[]> {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: {
        'Authorization': token ? token : ''
      }
    }
    return this.http.get<OrderList[]>(this.url, httpOptions);
  }
  
  addOrder (user: User, foods: Food[], status: string, orderfor: string, room: string) : Observable<OrderList> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.post<OrderList>(this.url,{ user, foods, status, orderfor,room}, httpOptions);
  }


  updateStatus (id: string, status: string) : Observable<OrderList> {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      }
      
    };

    return this.http.put<OrderList>(this.url + `/${id}/${status}`, {}, httpOptions);
  }

  deleteOrder(id: string) : Observable<OrderList> {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      }
    };
    return this.http.delete<OrderList>(this.url + `/${id}`,httpOptions);
  }
  
  /*Food Section*/

  readonly foodtypeURL = 'http://localhost:6789/inventory';


  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodtypeURL);
  }

   getFood(id: number): Observable<Food | undefined> {
    const food = FOODS.find(food => food.id === id);
    return of(food);    
  }

 
  /*List Part*/
  findItemById(listItems: any, id: number,selectedFlavor: string) {
    return listItems.find(function(item: { id: number,selectedFlavor: string }) {
      return item.id === id && item.selectedFlavor === selectedFlavor;
    });
  };

  addToList(food: Food, selectedAttribute: SelectedFoodAttribute) {
  let foodRef: Food = {
    id: 0,
    name: '',
    imageUrls: [],
    flavors: [],
    selectedFlavor: '',
    qty: 0,
    note: 'e.g. sugar 2 teaspoon(tsp.) ...',
    remaining: 10
  };
    Object.assign(foodRef,food);
    foodRef.selectedFlavor = selectedAttribute.flavor?.name,
    this.listItems.push(foodRef);
  }

  getListItems() {
    return this.listItems;
  }
  
  getSelectedItems() {
    return this.selectedAttribute;
  }

  removeSelectedItems() {
    localStorage.setItem('list', JSON.stringify(this.listItems));
  }

  updateSelectedItems() {
    localStorage.setItem('list', JSON.stringify(this.listItems));
  }

  clearList() {
    this.listItems.length = 0;
    return this.listItems;
  }
  


}
