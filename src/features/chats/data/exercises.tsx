import React from 'react';
import PerformanceRanking from "../components/performance/performance-ranking";
import { getExerciseData } from "./data";
import { performanceData } from '@/lib/data';

// Types
export type CategoryType = "schnelligkeit" | "beweglichkeit" | "technik";

export type ExerciseConfig = {
  id: string;
  title: string;
  category: CategoryType;
  component: React.ReactNode;
  color: string;
};

// Define the available exercises
export const exercises: ExerciseConfig[] = [
  // Schnelligkeit exercises
  {
    id: "10m-sprint",
    title: "10m Sprint",
    category: "schnelligkeit",
    component: (
      <PerformanceRanking
        title="10m Sprint"
        data={getExerciseData(performanceData, "10m Sprint")}
        unit="s"
        sortAscending={true}
      />
    ),
    color: "text-amber-500",
  },
  {
    id: "20m-sprint",
    title: "20m Sprint",
    category: "schnelligkeit",
    component: (
      <PerformanceRanking
        title="20m Sprint"
        data={getExerciseData(performanceData, "20m Sprint")}
        unit="s"
        sortAscending={true}
      />
    ),
    color: "text-amber-500",
  },
  // Beweglichkeit exercises
  {
    id: "gewandtheit",
    title: "Gewandtheit",
    category: "beweglichkeit",
    component: (
      <PerformanceRanking
        title="Gewandtheit"
        data={getExerciseData(performanceData, "Gewandtheit")}
        unit="s"
        sortAscending={true}
      />
    ),
    color: "text-indigo-500",
  },
  // Technik exercises
  {
    id: "dribbling",
    title: "Dribbling",
    category: "technik",
    component: (
      <PerformanceRanking
        title="Dribbling"
        data={getExerciseData(performanceData, "Dribbling")}
        unit="s"
        sortAscending={true}
      />
    ),
    color: "text-emerald-500",
  },
  {
    id: "ballkontrolle",
    title: "Ballkontrolle",
    category: "technik",
    component: (
      <PerformanceRanking
        title="Ballkontrolle"
        data={getExerciseData(performanceData, "Ballkontrolle")}
        unit="s"
        sortAscending={true}
      />
    ),
    color: "text-emerald-500",
  },
  {
    id: "balljonglieren",
    title: "Balljonglieren",
    category: "technik",
    component: (
      <PerformanceRanking
        title="Balljonglieren"
        data={getExerciseData(performanceData, "Balljonglieren")}
        unit="pts"
        sortAscending={false}
      />
    ),
    color: "text-emerald-500",
  },
]; 