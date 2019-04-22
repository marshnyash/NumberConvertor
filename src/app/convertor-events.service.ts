import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ConvertorEventsService {

  private events$:Subject<number>;
  
  constructor() {
    this.events$ = new Subject<number>();
  }

  getSubject():Subject<number> {
    return this.events$;
  }

}
