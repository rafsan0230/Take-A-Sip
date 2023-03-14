import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  inventoryDatas!: any;

constructor(private http: HttpClient){}
readonly inventoryURL = 'http://localhost:6789/inventory/getInventory';

getInventoryDatas() {
  return this.http.get(this.inventoryURL);
}
  
ngOnInit() {
  const getting = this.getInventoryDatas();
  if (getting) {
    getting.subscribe((response) => {
      console.log(response);
      this.inventoryDatas = response;
    });
  }
}
}
