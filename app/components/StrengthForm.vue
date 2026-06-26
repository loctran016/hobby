<template>
  <DialogRoot>
    <DialogTrigger
      class="inline-flex items-center justify-center focus:shadow-black focus:outline-none cursor-pointer ml-6 border border-transparent border-1 hover:pb-1 focus:pb-1 hover:border-b-purple-600 focus:border-b-purple-600 duration-300"
    >
      <div class="i-mdi:plus text-purple-600 text-xl mr-2" />
      Add Strength
    </DialogTrigger>
    <DialogPortal>
      <AnimatePresence multiple>
        <DialogOverlay
          as-child
          class="bg-transparent backdrop-blur-md w-screen h-screen fixed inset-0 z-30 "
        >
          <Motion
            :initial="{ opacity: 0}"
            :animate="{ opacity: 1}"
            :exit="{ opacity: 0, scale: 0.6 }"
          />
        </DialogOverlay>
        <DialogContent
          as-child
          class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-stone-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] text-gray-100"
        ><Motion
            :initial="{ opacity: 0, top: '40%' }"
            :animate="{ opacity: 1, top: '50%' }"
            :exit="{ opacity: 0, top: '30%' }"
          >
          <DialogTitle class="font-semibold mb-5 leading-normal">
            Strength Excercise
          </DialogTitle>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-grass11 w-[90px] text-right text-[15px]"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-grass11 w-[90px] text-right text-[15px]"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="@peduarte"
            />
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <DialogClose as-child>
              <button
                class="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none cursor-pointer"
              >
                Save changes
              </button>
            </DialogClose>
          </div>
          <DialogClose
            class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
          </DialogClose>

        </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { AnimatePresence, Motion } from "motion-v";
</script>

<style></style>
