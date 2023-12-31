import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractAccessor implements ControlValueAccessor {
  private _value: unknown;
  private _disabled = false;
  private _changed = false;
  private _blur = false;
  private _pristine = false;
  get pristine(): boolean {
    return this._pristine;
  }

  set pristine(value: boolean) {
    this._pristine = value;
  }

  get value(): unknown {
    return this._value;
  }

  set value(value: unknown) {
    if (this._value != value) {
      this._value = value;
      this.onChange(value);
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get changed(): boolean {
    return this._changed;
  }

  set changed(value: boolean) {
    if (this.value !== value) {
      this._blur = true;
      this._changed = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  writeValue(value: number): void {
    this._value = value;
  }

  registerOnChange(fn: unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: unknown): void {
    this.onTouched = fn;
  }

  //eslint-disable-next-line
  onChange: any = () => {
    // TODO: Implement feature
  };

  onTouched: unknown = () => {
    //TODO: Implement feature
  };
}
