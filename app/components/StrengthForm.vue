<template>
  <DialogRoot>
    <DialogTrigger
      class="inline-flex items-center justify-center focus:shadow-black focus:outline-none cursor-pointer ml-6 border border-transparent border-1 hover:pb-1 focus:pb-1 hover:border-b-purple-600 focus:border-b-purple-600 group"
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
          class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-stone-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
        ><Motion
            :initial="{ opacity: 0, top: '40%' }"
            :animate="{ opacity: 1, top: '50%' }"
            :exit="{ opacity: 0, top: '30%' }"
          >
          <DialogTitle class="font-semibold mb-5 leading-normal">
            Strength Excercise
          </DialogTitle>

            <form class="space-y-4" @submit.prevent="onSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium">Exercise</label>
      <ExerciseComboBox v-model="exercise" />
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Sets</label>
      <textarea
        v-model="setsInput"
        rows="5"
        placeholder="7 reps x 30 kg\n5 reps x 20 kg\n7 reps x 30 kg"
        class="w-full rounded-lg border px-3 py-2"
      />
      <p class="mt-1 text-xs text-stone-300">One set per line. Format: &lt;reps&gt; reps x &lt;weight&gt; kg</p>
    </div>

    <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
    <p v-if="successMsg" class="text-sm text-emerald-600">{{ successMsg }}</p>


    <DialogClose>
              <button
                class="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none cursor-pointer disabled:opacity-60"
              >
                {{ loading ? 'Saving...' : 'Save workout' }}
              </button>
            </DialogClose>
  </form>

          <!-- <div class="mt-[25px] flex justify-end">

          </div> -->
          <DialogClose
            class="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close" as-child
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

import type { StrengthExercise } from "~/types/database.types";

import { ref } from 'vue'

const supabase = useSupabaseClient()

const exercise = ref<StrengthExercise | null>(null)
const setsInput = ref('')

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

function parseSets(input: string): number[][] {
  const lines = input
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    throw new Error('Please add at least one set.')
  }

  return lines.map((line, idx) => {
    const m = line.match(/^([0-9]*\.?[0-9]+)\s*reps\s*x\s*([0-9]*\.?[0-9]+)\s*kg$/i)
    if (!m) {
      throw new Error(`Invalid set format on line ${idx + 1}. Use: 7 reps x 30 kg`)
    }

    const reps = Number(m[1])
    const weight = Number(m[2])

    if (!Number.isFinite(reps) || !Number.isFinite(weight)) {
      throw new Error(`Invalid numeric values on line ${idx + 1}.`)
    }

    return [reps, weight]
  })
}

async function onSubmit() {
  errorMsg.value = ''
  successMsg.value = ''

  if (!exercise.value) {
    errorMsg.value = 'Please select an exercise.'
    return
  }

  let parsedSets: number[][]
  try {
    parsedSets = parseSets(setsInput.value)
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Invalid sets input.'
    return
  }

  loading.value = true
  try {
    const { error } = await supabase.from('strength').insert({
      exercise: exercise.value,
      sets: parsedSets,
    })

    if (error) throw error

    successMsg.value = 'Workout saved.'
    exercise.value = null
    setsInput.value = ''
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Failed to save workout.'
  } finally {
    loading.value = false
  }
}

</script>

<style></style>
