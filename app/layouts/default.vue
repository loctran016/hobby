<script></script>

<template>
  <NavBar></NavBar>
  <div class="bg-stone-900 text-gray-100 min-h-screen overflow-hidden">
    <slot />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
