import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackBy<T>(index: number, entity: T) {
    return index;
  }
}
