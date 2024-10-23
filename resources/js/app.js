import './bootstrap';
import '../css/app.css';
import { createApp, h } from 'vue';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { createInertiaApp, Link, Head } from '@inertiajs/vue3';
import Layout from './Layouts/Default.vue';
createInertiaApp({
  title: (title) => `Laravel - inertia ${title}`,
  resolve: (name) => {
    const page = resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
    page.then((module) => {
      module.default.layout = module.default.layout || Layout;
    });

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .component('Link', Link)
      .component('Head', Head)
      .mount(el);
  },
});
