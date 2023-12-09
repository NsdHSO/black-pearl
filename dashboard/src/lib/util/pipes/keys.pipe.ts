import { Pipe, PipeTransform } from '@angular/core';
import { ProductionMilkType } from '../interfaces';

@Pipe({ name: 'keys', standalone: true })
export class KeysPipe implements PipeTransform {
  transform(value: any): any | ProductionMilkType {
    if (!value) return [];
    return Object.keys(value);
  }
}
