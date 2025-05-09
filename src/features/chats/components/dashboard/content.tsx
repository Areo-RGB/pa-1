"use client"

import { useState } from "react"
import { type CategoryType, exercises } from "../../data/exercises.tsx"
import CategoryTabs from "./CategoryTabs"
import ExerciseDisplay from "./ExerciseDisplay"

const categoryStyles: Record<CategoryType, { bg: string; border: string; icon: string }> = {
  schnelligkeit: { bg: "bg-background", border: "border-border", icon: "text-amber-500" },
  beweglichkeit: { bg: "bg-background", border: "border-border", icon: "text-indigo-500" },
  technik: { bg: "bg-background", border: "border-border", icon: "text-emerald-500" },
};

const defaultCategoryStyles = { bg: "bg-background", border: "border-border", icon: "text-gray-500" };

export default function Content() {
  // State for the selected category and exercise
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("schnelligkeit")
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("10m-sprint")
  
  // Filter exercises by category
  const categoryExercises = exercises.filter(ex => ex.category === selectedCategory)
  
  // Get the selected exercise
  const selectedExercise = exercises.find(ex => ex.id === selectedExerciseId) || categoryExercises[0]
  
  // Handle category change
  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category)
    // Select the first exercise in the new category
    const firstExerciseInCategory = exercises.find(ex => ex.category === category)
    if (firstExerciseInCategory) {
      setSelectedExerciseId(firstExerciseInCategory.id)
    }
  }

  // Get color classes based on selected category
  const getCategoryColorClasses = () => {
    return categoryStyles[selectedCategory] || defaultCategoryStyles;
  };

  const colorClasses = getCategoryColorClasses()

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-xl p-5 md:p-6 flex flex-col border border-border shadow-sm">
          <h2 className="text-xl font-bold text-card-foreground mb-5 text-left flex items-center">
            <span className="mr-2 inline-block w-1 h-6 bg-primary rounded-full"></span>
            Leistungsdiagnostik
          </h2>

          <div className="max-w-xl mx-auto w-full">
            <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

            {/* Content Container */}
            <ExerciseDisplay 
              selectedExerciseId={selectedExerciseId}
              onExerciseChange={setSelectedExerciseId}
              categoryExercises={categoryExercises}
              selectedExercise={selectedExercise}
              colorClasses={colorClasses} 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 