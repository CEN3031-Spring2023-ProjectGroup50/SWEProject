import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() { }

  private subject = new Subject<any>();
  private reloadSub = new Subject<any>();

  menuNavToggle() {
    this.subject.next({});
  }

  getMenuResponse(): Observable<any> {
    return this.subject.asObservable();
  }

  reload() {
    this.reloadSub.next({});
  }

  getReloadResponse(): Observable<any> {
    return this.reloadSub.asObservable();
  }

  @Output() aClickedEvent = new EventEmitter<string>();

  AClicked(msg: string) {
    this.aClickedEvent.emit(msg);
    return this.reloadSub.asObservable();
  }

}
