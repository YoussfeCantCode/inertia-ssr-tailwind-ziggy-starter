import { createInertiaApp, Link, Head } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import Layout from './Layouts/Default.vue';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { Ziggy } from './ziggy.js';
import { createSSRApp, h } from 'vue';

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page = (
        await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'))
      ).default;
      page.layout = page.layout || Layout;
      return page;
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props),
      })
        .use(ZiggyVue, Ziggy)
        .component('Link', Link)
        .component('Head', Head)
        .use(plugin);
    },
  })
);
