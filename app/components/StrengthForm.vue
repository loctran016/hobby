<template>
  <DialogRoot>
    <DialogTrigger
      class="inline-flex items-center justify-center focus:shadow-black focus:outline-none cursor-pointer ml-6 border border-transparent border-1 hover:pb-1 focus:pb-1 hover:border-b-purple-600 focus:border-b-purple-600 duration-300 group"
    >
      <div class="i-mdi:plus text-purple-600 text-xl mr-2" />
      <span class="group-hover:text-purple-500 group-focus:text-purple-500 group-hover:font-semibold group-focus:font-semibold">Add Strength</span>

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
<!-- ComboxRoot -->

            <ComboboxRoot
    v-model="values"
    multiple
    ignore-filter
    class="my-4 mx-auto relative"
  >
    <ComboboxAnchor class="w-[400px] inline-flex items-center justify-between rounded-lg p-2 text-[13px] leading-none  gap-[5px] shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
      <TagsInputRoot
        v-model="values"
        delimiter=""
        class="flex gap-2 items-center rounded-lg flex-wrap"
      >
        <TagsInputItem
          v-for="item in values"
          :key="item"
          :value="item"
          class="flex items-center justify-center gap-2  bg-grass8 aria-[current=true]:bg-grass9 rounded px-2 py-1"
        >
          <TagsInputItemText class="text-sm" />
          <TagsInputItemDelete>
            <div class="i-tabler:x" />
          </TagsInputItemDelete>
        </TagsInputItem>

        <ComboboxInput
          v-model="query"
          as-child
        >
          <TagsInputInput
            placeholder="Muscles"
            class="focus:outline-none flex-1 rounded !bg-transparent  placeholder:text-mauve10 px-1"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInputRoot>

      <ComboboxTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="h-4 w-4 text-grass11"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent class="absolute z-10 w-full mt-2 overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
      <ComboboxViewport class="p-[5px]">
        <ComboboxGroup v-if="filteredOptions.length" class="h-20 lg:h-40 overflow-y-scroll">

          <ComboboxItem
            v-for="(option, index) in filteredOptions"
            :key="index"
            class="text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass8 data-[highlighted]:text-grass1"
            :value="option"
          >
            <ComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon icon="radix-icons:check" />
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>

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
            class="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
          </DialogClose>

        </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
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

import type { Muscles } from "~/types/database.types";

import { ComboboxAnchor, ComboboxContent, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxRoot, ComboboxTrigger, ComboboxViewport, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useFilter } from 'reka-ui'
import { computed, ref, watch } from 'vue'

const { contains } = useFilter({ sensitivity: 'base' })

const query = ref('')
const values = ref < Muscles[] > ([]);

const options: Muscles[] = [
  "Upper chest",
  "Middle chest",
  "Lower chest",
  "Front delts",
  "Side delts",
  "Rear delts",
  "Abs",
  "Lats",
  "Traps",
  "Lower back",
  "Forearm",
  "Triceps",
  "Biceps",
];
const filteredOptions = computed(() => options.filter(option => contains(option, query.value) && !values.value.includes(option)))

watch(values, () => {
  query.value = ''
}, { deep: true })
</script>

<style></style>
