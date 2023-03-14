import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { FormBuilder} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/interfaces/user';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit{
  
  errorMsg : string = '';
  listItems = this.listService.getListItems();

  orderForm = this.fb.group({
    room:'',
    order:''
  });
  user: User;
  isDialogVisible: boolean = false;
  

  ngOnInit () {
    const userStr = localStorage.getItem('user');
    this.user = userStr ? JSON.parse(userStr) : null;
  }

  constructor(private listService: FoodService, private fb: FormBuilder,private http: HttpClient,private notificationService: NotificationService, private io: Socket) { }

  onSubmit() {
    // console.log(this.listService.getListItems())
    const val = this.orderForm.value;
    console.log('all foods', this.listItems)
    this.listService.addOrder(this.user,this.listItems,'created',val.order!,val.room!).subscribe(()=>{});
    console.log('from order form', this.listItems.map(el => {return el}))
    this.notificationService.notifySuccess('Successfully submitted your order!','Congrats 🎉')
    this.orderForm.reset();
    this.listService.clearList();
  }

  openDialog() {
    this.isDialogVisible = true;
  }

  closeDialog(e: Event) {
    this.isDialogVisible = false;
  }

  dialogYes(e: Event) {
    this.onSubmit();
    this.isDialogVisible = false;
  }

}
