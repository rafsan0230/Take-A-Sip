import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Output() noEvent = new EventEmitter();
  @Output() yesEvent = new EventEmitter();

  constructor(private router: Router){}
  
  handleNo() {
    this.noEvent.emit(null);
  }

  handleYes() {
    this.yesEvent.emit(null);
    this.router.navigate(['home']);
  }
}
