const subscriptions = new WeakMap();

export const connector = (store) => (
  (Element, map) => class extends Element {
    connectedCallback() {
      const { selectors, actions } = map;

      if (selectors) {
        const update = () => Object.assign(
          this,
          selectors(store.getState())
        );
        subscriptions.set(this, store.subscribe(update));
        update();
      }

      if (actions) {
        const dispatchers = actions(store.dispatch);
        for (const type in dispatchers) {
          this.addEventListener(type, event => {
            event.stopImmediatePropagation();
            dispatchers[type](event.detail);
          });
        }
      }

      if (super.connectedCallback) {
        super.connectedCallback();
      }
     }

    disconnectedCallback() {
      if (map.selectors) {
        const unsubscribe = subscriptions.get(this);
        unsubscribe();
      }
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }
  }
);
