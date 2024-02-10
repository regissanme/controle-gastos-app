import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  constructor() {
  }

}
