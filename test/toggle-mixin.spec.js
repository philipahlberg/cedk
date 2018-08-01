import { ToggleMixin } from '../dist/index.js';

const ToggleElement = ToggleMixin(HTMLElement);

customElements.define('toggle-element', ToggleElement);

describe('ToggleMixin', () => {
  let element;

  beforeEach(() => {
    element = new ToggleElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('is not checked by default', () => {
    expect(element.checked).to.be.false;
  });

  it('can be checked by property setter', () => {
    element.checked = true;
    expect(element.checked).to.equal(true);
  });

  it('sets checked attribute', () => {
    element.checked = true;
    expect(element.hasAttribute('checked')).to.equal(true);
  });

  it('can be toggled', () => {
    element.toggle();
    expect(element.checked).to.equal(true);
  });

  it('input can be prevented', () => {
    element.addEventListener('input', e => {
      e.preventDefault();
    }, { once: true });

    element.checked = true;
    expect(element.checked).to.equal(false);
  });
});