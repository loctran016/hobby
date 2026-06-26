// import { autoAnimate } from '@formkit/auto-animate'
// import type { Directive } from 'vue'

// export default defineNuxtPlugin((nuxtApp) => {
//   const vAutoAnimate: Directive<HTMLElement, Parameters<typeof autoAnimate>[1] | undefined> = {
//     mounted(el, binding) {
//       autoAnimate(el, binding.value ?? { duration: 180, easing: 'ease-out' })
//     },
//   }

//   nuxtApp.vueApp.directive('auto-animate', vAutoAnimate)
// })

import { autoAnimate } from "@formkit/auto-animate";

export default defineNuxtPlugin((nuxtApp) => {
  const vAutoAnimate = {
    mounted(el, binding) {
      autoAnimate(el, binding.value ?? { duration: 180, easing: "ease-out" });
    },
  };

  nuxtApp.vueApp.directive("auto-animate", vAutoAnimate);
});
