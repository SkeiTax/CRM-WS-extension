
export interface IDependencyProperty<T> {
  key: string;
  get value(): T;
  set value(_: T);
}
