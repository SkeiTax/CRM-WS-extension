import { ref, Ref, UnwrapRef } from "vue";

export interface IDependencyProperty<T> {
  key: string;
  get value(): T;
  set value(_: T);
}

export class DependencyProperty<T> implements IDependencyProperty<T> {
  public key: string;
  private _value: T;

  constructor(key: string, value: T) {
    this.key = key;
    this._value = value;
  }

  public get value() {
    return this._value;
  }

  public set value(_: T) {
    this._value = _;
  }
}
