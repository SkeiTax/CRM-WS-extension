import { IDependencyProperty } from "../Interfaces/IDependencyProperty";

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
