import { App, createVNode, render } from 'vue';
import Loading from '/@/components/Indicator/index.vue';

export default (function () {
  return {
    install(app: App) {
      const VNode = createVNode(Loading);
      render(VNode, document.body);
      app.config.globalProperties.LOADING = {
        show: VNode.component?.exposed?.show,
        hide: VNode.component?.exposed?.hide,
      };
    },
    show() {
      console.log('Loading :>> ', Loading);
      Loading.show();
    },
    hide() {
      Loading.hide();
    },
  };
})();
