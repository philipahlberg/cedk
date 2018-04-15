import { MinimalMixin } from '../dist/index.js';

const MinimalElement = MinimalMixin(HTMLElement);
customElements.define('minimal-element', MinimalElement);

describe('MinimalMixin', () => {
  let element;
  beforeEach(() => {
    element = new MinimalElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  })

  it('emits an event', () => {
    let triggered = false;
    element.addEventListener('event', () => {
      triggered = true;
    }, { once: true });
    element.emit('event');
    expect(triggered).to.be.true;
  });

  it('emits an event with detail', () => {
    let detail;
    element.addEventListener('event', (event) => {
      detail = event.detail;
    }, { once: true });
    element.emit('event', { boolean: true });
    expect(detail.boolean).to.be.true;
  });

  it('toggles an attribute', () => {
    expect(element.hasAttribute('attribute')).to.be.false;
    element.toggleAttribute('attribute');
    expect(element.hasAttribute('attribute')).to.be.true;
    element.toggleAttribute('attribute');
    expect(element.hasAttribute('attribute')).to.be.false;
  });

  it('conditionally toggles an attribute', () => {
    element.toggleAttribute('attribute', true);
    expect(element.hasAttribute('attribute')).to.be.true;
    element.toggleAttribute('attribute', false);
    expect(element.hasAttribute('attribute')).to.be.false;
  });
});