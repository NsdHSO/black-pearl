import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {forwardRef} from "@angular/core";

export const FORWARD_REF = <T>(COMPONENT: { new (): T }) => ({
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => COMPONENT),
    multi: true,
});