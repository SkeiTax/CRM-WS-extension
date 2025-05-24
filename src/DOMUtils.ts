export function waitForElm(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector) as Element);
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector) as Element);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: Partial<HTMLElementTagNameMap[K]>,
  styles?: Partial<CSSStyleDeclaration> // стили как объект
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  if (options) {
    Object.assign(element, options);
  }

  if (styles) {
    Object.assign(element.style, styles);
  }

  return element;
}
