import { DependencyProperty } from "./DependencyProperty";

export class StoredProperty<T> extends DependencyProperty<T> {
  public key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    super(key, defaultValue);
    this.key = key;
    this.defaultValue = defaultValue;
  }

  override get value(): T {
    const raw = localStorage.getItem(this.key);
    if (raw === null) {
      super.value = this.defaultValue;
      return this.defaultValue;
    }

    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(
        `StoredProperty: Failed to parse value for key "${this.key}"`,
        e
      );
      return this.defaultValue;
    }
  }

  override set value(_: T) {
    super.value = _;
    this.save(_);
  }

  private save = (value: T) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  };

  public clear = () => {
    localStorage.removeItem(this.key);
  };

  public exists = () => {
    return localStorage.getItem(this.key) !== null;
  };
}
