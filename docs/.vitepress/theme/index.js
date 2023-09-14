import DefaultTheme from 'vitepress/theme'
import ComponentDoc from "../custom/components/componentDoc.vue";
import Space from "../custom/components/space.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
      app.component('ComponentDoc', ComponentDoc);
      app.component('Space', Space);
  }
}