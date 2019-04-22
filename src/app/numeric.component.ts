import { Component } from '@angular/core';
import { ConvertorEventsService } from './convertor-events.service';
import { FirebaseService } from './firebase.service';

@Component({ 
    selector: 'numeric',
    templateUrl: './numeric.component.html',
    styleUrls: ['./numeric.component.css']
})

export class NumericComponent{
  title = 'conventer';
  items: Array<any>;
  constructor(private events:ConvertorEventsService, public firebaseService: FirebaseService) {
    
  }

  sendNumber(event):void {
    console.log('event', event.target.value);
    var number = event.target.value;
    // if(number == 12){
    //     this.events.getSubject().error(number);
    // }else{
        this.events.getSubject().next(number);
    // }
  }

  getLastValue():void{
    this.firebaseService.getLastString()
    .subscribe(result => {
        this.items = result;
    });
    console.log(this.items);
  }
}
