export interface IDependencyProperty<T> {
  key: string;
  value: T;
}

export class DependencyProperty<T> implements IDependencyProperty<T> {
  public key: string;
  public value: T;

  constructor(key: string, value: T){
    this.key = key
    this.value = value
  }
}