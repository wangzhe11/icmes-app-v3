import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(
  createPersistedState({
    auto: true,
  }),
);

export function setupStore(app: App<Element>) {
  app.use(pinia);
}

export { pinia };
