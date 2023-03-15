import { Component } from '@angular/core';
import { Food } from 'src/app/interfaces/food';
import { FoodService } from 'src/app/services/food.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Inventory } from 'src/app/interfaces/inventory';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  trash = faTrashCan;
  frontIcon = faArrowRightLong;
  plusIcon = faPlus;

  listItems = this.listService.getListItems();
  readonly inventoryURL = 'http://localhost:6789/inventory/getInventory';
  inventoryItems!: any;
  constructor(
    private listService: FoodService,
    private route: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const getting = this.getInventoryDatas();
    if (getting) {
      getting.subscribe((response) => {
        // console.log(response);
        this.inventoryItems = response;
      });
    }
  }

  getInventoryDatas() {
    return this.http.get(this.inventoryURL);
  }
  emptyList() {
    this.listService.clearList();
  }
  removeItem(food: Food) {
    let index = this.listItems.indexOf(food);
    this.listItems.splice(index, 1);
  }
  onQuantityChange(food: Food) {
    if (this.checkInventory(food)) {
      const selectedItem = this.getSelectedItem(food)
      this.notificationService.notifyError(
        `Please order below ${selectedItem[0].remaining}`,
        '☕️ Error'
      );
    }
  }

  onFlavourChange(food: Food) {}

  checkInventory(food: Food) {
    const selectedItem = this.inventoryItems.filter((item: Inventory) => {
      return (
        item.name === food.name && item.selectedFlavor === food.selectedFlavor
      );
    });
    if (food.qty > selectedItem[0].remaining) return true;
    else return false;
  }
  getSelectedItem(food: Food) {
    const selectedItem = this.inventoryItems.filter((item: Inventory) => {
      return (
        item.name === food.name && item.selectedFlavor === food.selectedFlavor
      );
    });
    return selectedItem;
    
  }
}
