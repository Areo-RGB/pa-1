"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ExerciseConfig } from '../../data/exercises.tsx'; // Note: Path to ExerciseConfig

interface ExerciseDisplayProps {
  selectedExerciseId: string;
  onExerciseChange: (value: string) => void;
  categoryExercises: ExerciseConfig[];
  selectedExercise?: ExerciseConfig; // Can be undefined if no exercise is selected or found
  colorClasses: { icon: string }; // Simplified, only icon color is used here directly
}

export default function ExerciseDisplay({
  selectedExerciseId,
  onExerciseChange,
  categoryExercises,
  selectedExercise,
  colorClasses,
}: ExerciseDisplayProps) {
  return (
    <div className="rounded-lg p-5 border border-border bg-background shadow-sm">
      {/* Exercise Header with dropdown */}
      <div className="mb-5">
        {/* Exercise Selector */}
        <Select
          value={selectedExerciseId}
          onValueChange={onExerciseChange}
        >
          <SelectTrigger
            className={cn(
              "w-full h-9 text-sm",
              colorClasses.icon
            )}
          >
            <SelectValue placeholder="Übung auswählen" />
          </SelectTrigger>
          <SelectContent>
            {categoryExercises.map((exercise) => (
              <SelectItem
                key={exercise.id}
                value={exercise.id}
                className={colorClasses.icon}
              >
                {exercise.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exercise Content */}
      {selectedExercise ? (
        <div className="animate-in fade-in duration-200">
          {selectedExercise.component}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          Bitte eine Übung auswählen.
        </div>
      )}
    </div>
  );
} 