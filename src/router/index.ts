import routes from '~pages';
import { createRouter, createWebHashHistory } from 'vue-router';

console.log('routes', routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, { path: '/', redirect: '/login' }],
});
// eslint-disable-next-line no-console
console.log(routes);
export default router;
