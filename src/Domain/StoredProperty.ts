import { IDependencyProperty } from "./DependencyProperty";

export class StoredProperty<T> implements IDependencyProperty<T> {
  public key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  get value(): T {
    const raw = localStorage.getItem(this.key);
    if (raw === null) {
      // If key is not present, store default value
      this.save(this.defaultValue);
      return this.defaultValue;
    }

    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`StoredProperty: Failed to parse value for key "${this.key}"`, e);
      return this.defaultValue;
    }
  }

  set value(newValue: T) {
    this.save(newValue);
  }

  private save(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public clear(): void {
    localStorage.removeItem(this.key);
  }

  public exists(): boolean {
    return localStorage.getItem(this.key) !== null;
  }
}
