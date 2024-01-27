import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'getControl',
  standalone: true,
})
export class GetControlPipe implements PipeTransform {
  transform<T extends { controls: { [key: string]: AbstractControl } }>(
    value: T,
    ...args: unknown[]
  ): FormControl<unknown> {
    return value.controls[args[0] as string] as FormControl;
  }
}
