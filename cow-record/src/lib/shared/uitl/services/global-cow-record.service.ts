import { inject, Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalCowRecordService {
  private _router = inject(Router);

  whoYouAre: UntypedFormControl;

  constructor() {
    this.whoYouAre = new UntypedFormControl('');
  }

  navigate(route: unknown[]) {
    const url = route.map((segment) => String(segment)).join('/');
    this._router.navigateByUrl(url);
  }
}
