/// <reference types="vite/client" />

import axios from 'axios';
import { DefineComponent } from 'vue';

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios;
  }
}
