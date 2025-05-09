"use client";

import { Zap, Activity, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CategoryType } from "../../data/exercises.tsx";

interface CategoryTabsProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export default function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex justify-between mb-5 rounded-lg p-1 border border-border/40 bg-muted/10">
      <button
        onClick={() => onCategoryChange("schnelligkeit")}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all min-w-0 flex-1",
          selectedCategory === "schnelligkeit"
            ? "bg-background border border-border shadow-sm"
            : "border border-transparent"
        )}
      >
        <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mr-2" />
        <span className="text-sm font-medium truncate">Schnell.</span>
      </button>

      <button
        onClick={() => onCategoryChange("beweglichkeit")}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all min-w-0 flex-1",
          selectedCategory === "beweglichkeit"
            ? "bg-background border border-border shadow-sm"
            : "border border-transparent"
        )}
      >
        <Activity className="w-4 h-4 text-indigo-500 flex-shrink-0 mr-2" />
        <span className="text-sm font-medium truncate">Beweg.</span>
      </button>

      <button
        onClick={() => onCategoryChange("technik")}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all min-w-0 flex-1",
          selectedCategory === "technik"
            ? "bg-background border border-border shadow-sm"
            : "border border-transparent"
        )}
      >
        <Brain className="w-4 h-4 text-emerald-500 flex-shrink-0 mr-2" />
        <span className="text-sm font-medium truncate">Technik</span>
      </button>
    </div>
  );
} 