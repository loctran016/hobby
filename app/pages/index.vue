<script setup lang="ts">
import type { CalendarRootProps } from 'reka-ui'
// import { Icon } from '@iconify/vue'
import { CalendarDate } from '@internationalized/date'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui'

const date = new CalendarDate(2026, 7, 1)

const isDateUnavailable: CalendarRootProps['isDateUnavailable'] = (date) => {
  return date.day === 317
}
</script>

<template>
  <div class="min-h-screen">
    <div
      class="grid lg:grid-cols-6 gap-4 max-w-9/10 lg:max-w-4/5 px-4 pt-20 py-4 mx-auto font-sans dark:text-gray-100"
    >
      <CalendarRoot
        v-slot="{ weekDays, grid }"
        :is-date-unavailable="isDateUnavailable"
        :default-value="date"
        class="mt-6 rounded-xl lg:order-first lg:col-span-3 bg-white p-4 shadow-sm border"
        fixed-weeks
      >
        <CalendarHeader class="flex items-center justify-between">
          <CalendarPrev
            class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <!-- TODO: <Icon icon="radix-icons:chevron-left" class="w-4 h-4" /> -->
          </CalendarPrev>
          <CalendarHeading class="text-sm text-black font-medium" />

          <CalendarNext
            class="inline-flex items-center cursor-pointer justify-center text-black rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <!-- TODO: <Icon icon="radix-icons:chevron-right" class="w-4 h-4" /> -->
          </CalendarNext>
        </CalendarHeader>
        <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <CalendarGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <CalendarGridHead>
              <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
                <CalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="rounded-md text-xs text-green8"
                >
                  {{ day }}
                </CalendarHeadCell>
              </CalendarGridRow>
            </CalendarGridHead>
            <CalendarGridBody class="grid">
              <CalendarGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="grid grid-cols-7"
              >
                <CalendarCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="relative text-center text-sm"
                >
                  <CalendarCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center rounded-full whitespace-nowrap text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[outside-view]:text-black/30 data-[selected]:!bg-green10 data-[selected]:text-white hover:bg-green5 data-[highlighted]:bg-green5 data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9"
                  />
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      </CalendarRoot>
    </div>
  </div>
</template>
