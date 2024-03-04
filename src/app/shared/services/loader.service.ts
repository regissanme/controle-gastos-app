import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable()

  constructor() {
  }

  showLoadingUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    this.loadingOn()
    return obs$.pipe(finalize(() => this.loadingOff()));
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);

  }

}
