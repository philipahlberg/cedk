import { Mixin } from './mixin.js';
import { BaseMixin } from './base-mixin.js';
import { PropertiesMixin } from './properties-mixin.js';

export const FocusMixin = Mixin(SuperClass => {
  const Base = PropertiesMixin(BaseMixin(SuperClass));
  const disabledChanged = Symbol();

  return class FocusElement extends Base {
    static get properties() {
      return Object.assign({}, super.properties, {
        /**
         * Specifies if the element is disabled.
         */
        disabled: {
          type: Boolean,
          reflectToAttribute: true,
          observer: disabledChanged
        },
        /**
         * Specifies if the element is focused.
         * 
         * Note: use `.focus()` to focus the element.
         */
        focused: {
          type: Boolean,
          reflectToAttribute: true
        }
      });
    }

    constructor() {
      super();
      this.focused = false;
      this.disabled = false;
    }

    [disabledChanged](newValue, oldValue) {
      if (newValue === oldValue) return;

      this.setAttribute('aria-disabled', String(newValue));
      if (newValue) {
        // Remove attribute entirely to ensure that the
        // element is no longer focusable
        this.removeAttribute('tabindex');
        this.blur();
      } else {
        this.setAttribute('tabindex', '0');
      }
    }

    /**
     * Focus the element, unless it is disabled.
     * 
     * Fires a `focus` event.
     * 
     * @event focus
     */
    focus() {
      if (this.disabled) {
        return;
      }

      super.focus();
      this.focused = true;
      this.dispatchEvent(new FocusEvent('focus'));
      this.dispatchEvent(new FocusEvent('focusin', {
        bubbles: true
      }));
    }

    /**
     * Blur the element.
     * 
     * Fires a `blur` event.
     * 
     * @event blur
     */
    blur() {
      if (this.disabled) {
        return;
      }

      super.blur();
      this.focused = false;
      this.dispatchEvent(new FocusEvent('blur'));
      this.dispatchEvent(new FocusEvent('focusout', {
        bubbles: true
      }));
    }
  }
});