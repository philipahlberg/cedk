import { Mixin } from './mixin.js';
import { Base } from './base.js';
import { Properties } from './properties.js';

/**
 * A generic mixin for elements that represent
 * an on/off control.
 *
 * Attributes:
 * - checked
 *
 * Properties:
 * - checked
 *
 * Events:
 * - input
 * - change
 *
 * Methods:
 * - toggle
 *
 */
export const Toggle = Mixin(SuperClass => {
  const Super = Properties(Base(SuperClass));

  const onClick = Symbol();
  const onKeydown = Symbol();
  const checkedChanged = Symbol();

  return class ToggleElement extends Super {
    static get properties() {
      return Object.assign({}, super.properties, {
        checked: {
          type: Boolean,
          reflectToAttribute: true,
          observer: checkedChanged
        }
      });
    }

    constructor() {
      super();
      this.checked = false;
      this[onClick] = this[onClick].bind(this);
      this[onKeydown] = this[onKeydown].bind(this);
    }

    [checkedChanged](newValue, oldValue) {
      if (newValue === oldValue) return;

      this.setAttribute('aria-checked', String(newValue));
      this.dispatchEvent(
        new Event('input', {
          bubbles: true
        })
      );
    }

    connectedCallback() {
      this.addEventListener('click', this[onClick]);
      this.addEventListener('keydown', this[onKeydown]);

      if (super.connectedCallback) {
        super.connectedCallback();
      }
    }

    /**
     * Toggle the checked state of the element,
     * unless the element is disabled.
     *
     * @event input
     */
    toggle() {
      if (this.disabled) {
        return;
      }
      this.checked = !this.checked;
    }

    /**
     * @private
     */
    [onClick]() {
      if (this.disabled) {
        return;
      }
      this.toggle();
      this.dispatchEvent(
        new Event('change', {
          bubbles: true
        })
      );
    }

    /**
     * @private
     */
    [onKeydown](event) {
      if (this.disabled) {
        return;
      }
      switch (event.key) {
        case 'Enter':
        case ' ':
          this.toggle();
          this.dispatchEvent(
            new Event('change', {
              bubbles: true
            })
          );
          break;
        default:
          return;
      }
    }
  };
});

export { Toggle as ToggleMixin };
