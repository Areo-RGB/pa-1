"use client"

import { useState } from "react"
import { getExerciseData } from "@/features/chats/data/data"
import { performanceData } from '@/lib/data'
import PerformanceRanking from "./performance-ranking"

// Define available exercises
const exercises = [
  { id: "10m-sprint", title: "10m Sprint" },
  { id: "20m-sprint", title: "20m Sprint" },
  { id: "gewandtheit", title: "Gewandtheit" },
  { id: "dribbling", title: "Dribbling" },
  { id: "ballkontrolle", title: "Ballkontrolle" },
  { id: "balljonglieren", title: "Balljonglieren" }
]

export default function PerformanceDashboard() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])

  // Get data for the selected exercise
  const data = getExerciseData(performanceData, selectedExercise.title)

  // Handle exercise change
  const handleExerciseChange = (exerciseTitle: string) => {
    const exercise = exercises.find(ex => ex.title === exerciseTitle)
    if (exercise) {
      setSelectedExercise(exercise)
    }
  }

  // Determine if sorting should be ascending based on exercise
  const sortAscending = selectedExercise.title !== "Balljonglieren"

  return (
    <PerformanceRanking
      title={selectedExercise.title}
      displayTitle={selectedExercise.title}
      data={data}
      unit={selectedExercise.title === "Balljonglieren" ? "pts" : "s"}
      sortAscending={sortAscending}
      onExerciseChange={handleExerciseChange}
      availableExercises={exercises}
    />
  )
} 