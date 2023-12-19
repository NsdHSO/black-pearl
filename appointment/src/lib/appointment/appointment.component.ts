import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmmountDataService } from '../util/services/ammount-data.service';
import { MatIconModule } from '@angular/material/icon';
import { of, tap } from 'rxjs';
import { buildSVG } from '@graph';

@Component({
  selector: 'black-pearl-appointment',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  private _amountService = inject(AmmountDataService);

  amountData$ = this._amountService.amountData$;

  data$ = of('das').pipe(
    tap(console.log),
    tap((v: string) => {
      buildSVG('#test');
    }),
  );
}
