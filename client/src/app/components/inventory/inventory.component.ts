import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  inventoryDatas!: any;
  addItem = false;
  quantity =0;



  constructor(private http: HttpClient, private router: Router) {}
  readonly inventoryURL = 'http://localhost:6789/inventory/getInventory';
  readonly addInventoryURL = 'http://localhost:6789/inventory';

  getInventoryDatas() {
    return this.http.get(this.inventoryURL);
  }
  addItemShow(){
    this.addItem=true
  }

  keyup(value : any) {
    // this.inventoryDatas.re = value;
  }

  submitQty(id:string, qty:any){
    console.log(id,qty)
    this.quantity=qty;
    this.http
        .put(this.addInventoryURL, {id,qty})
        .subscribe((response) => {
          const getting = this.getInventoryDatas();
          if (getting) {
            getting.subscribe((response) => {
              console.log(response);
              this.inventoryDatas = response;
            });
          }
          console.log(response);
        });
        // this.router.navigate(['inventory']);
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
