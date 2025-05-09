// Re-export only used functions from the lib/data file
export {
  // performanceData, // Unused according to Knip
  // videoData, // Unused according to Knip
  // getCategories, // Unused according to Knip
  // getExercises, // Unused according to Knip
  // getPlayerNames, // Unused according to Knip
  // getPlayerData, // Unused according to Knip
  getExerciseData, // Keep: Needed by ranking components
  // getCategoryData, // Unused according to Knip
  // getBenchmarkData, // Unused according to Knip
  // calculatePerformanceDifference, // Unused according to Knip
  // isLowerBetter, // Unused according to Knip
  estimatePlayerPercentile, // Keep: Not listed by Knip
  getPerformanceCategory, // Keep: Not listed by Knip
  getGradientColor, // Keep: Not listed by Knip
  getGradientTextColor, // Keep: Not listed by Knip
  // getVideoMappingsForExercise // Unused according to Knip
} from '@/lib/data' 