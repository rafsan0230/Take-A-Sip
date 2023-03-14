import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  rootUrl = 'http://localhost:6789/inventory/getInventory';
  constructor(private http: HttpClient) {}

  getInventoryItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.rootUrl);
  }
}
