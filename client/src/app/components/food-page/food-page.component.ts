import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/interfaces/food';
import { Flavor } from 'src/app/interfaces/flavor';
import { SelectedFoodAttribute } from 'src/app/interfaces/selectedFoodAttribute';
import { FoodService } from 'src/app/services/food.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/interfaces/inventory';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent implements OnInit {
  // Foods:Food[] = [];
  backIcon = faArrowLeftLong;
  plusIcon = faPlus;
  minusIcon = faMinus;

  imageUrl: string = '';
  food: Food | undefined;
  inventoryItems: Inventory[];

  selectedAttributes: SelectedFoodAttribute = {
    flavor: undefined,
  };
  noteAreaForm = this.fb.group({
    noteArea: '',
  });

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authRoute: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.getFood();
    //console.log(this.food);

    this.inventoryService.getInventoryItems().subscribe((items) => {
      this.inventoryItems = items;
    });

    this.setSelectedAttributes(this.food?.flavors[0]);
    if (this.selectedAttributes?.flavor) {
      this.setImageUrl(this.selectedAttributes.flavor);
    }

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
  }

  getFood(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log('from url', id);

    // const getting = this.foodService.getFoods();
    // if (getting) {
    //   getting.subscribe((response) => {
    //     console.log("food service",response);
    //     this.Foods = response;
    //   });
    // }

    this.foodService.getFood(id).subscribe((response) => {
      console.log('food service', response);
      this.food = response;
    });
  }

  setImageUrl(flavor: Flavor): void {
    const flavorImageUrl = this.food?.imageUrls.find((url) =>
      url.includes(flavor.name)
    );
    if (!flavorImageUrl) {
      throw Error(`No flavor for ${flavor.name} value`);
    }
    this.imageUrl = flavorImageUrl;
  }

  public updateSelectedFoodAttributes(flavor: Flavor | undefined) {
    this.setSelectedAttributes(flavor ?? { name: 'none', color: '#DDD' });
    if (this.selectedAttributes.flavor) {
      this.setImageUrl(this.selectedAttributes.flavor);
    }
  }

  private setSelectedAttributes(flavor: Flavor | undefined) {
    this.selectedAttributes = {
      flavor: flavor,
    };
  }

  addToList(food: Food, selectedAttributes: SelectedFoodAttribute) {
    console.log('selected flabvour', this.selectedAttributes)
    food.selectedFlavor =
      this.selectedAttributes.flavor?.name.toLocaleLowerCase();

    // console.log(this.food, this.selectedAttributes.flavor?.name);
    if (this.food && this.food.qty <= 10) {
      this.foodService.addToList(food, selectedAttributes);
      this.notificationService.notifySuccess(
        'Order added to the list!',
        '☕️ SUCCESS'
      );
    } else {
      this.notificationService.notifyError(
        'Limit of items ordered exceeded',
        '☕️ Error'
      );
    }
    this.noteAreaForm.reset();
  }

  isValidQty() {
    if (this.food && this.food.qty) {
      if (this.food.qty != 0 && this.food.qty > 0) return true;
    }
    return false;
  }
  plus() {
    // need to check if it overflows here
    if (this.food) this.food.qty = this.food.qty + 1;
  }
  minus() {
    if (this.food && this.food.qty > 0) {
      this.food.qty = this.food.qty - 1;
    }
  }
}
