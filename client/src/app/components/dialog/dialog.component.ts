import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  @Output() noEvent = new EventEmitter();
  @Output() yesEvent = new EventEmitter();

  constructor(private io: Socket, private router: Router,private http: HttpClient){}
  
  handleNo() {
    this.noEvent.emit(null);
  }
  ngOnInit(): void {
    this.io.emit('join_room');
  }
  handleYes() {
    this.yesEvent.emit(null);
    this.io.emit('gotNewOrder');
    this.router.navigate(['home']);
  }
}
