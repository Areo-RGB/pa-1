import { UserStatus } from './schema'

// Performance data
const performanceData = [
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Finley", ergebnis: 2.0 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Finley", ergebnis: 3.59 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Finley", ergebnis: 7.81 },
  { kategorie: "Technik", uebung: "Dribbling", name: "Finley", ergebnis: 10.27 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "Finley", ergebnis: 0.0 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "Finley", ergebnis: 10.82 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "Finley", ergebnis: 640 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Alex", ergebnis: 7.39 },
  { kategorie: "Technik", uebung: "Dribbling", name: "Alex", ergebnis: 10.0 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Alex", ergebnis: 2.16 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Alex", ergebnis: 3.78 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "Alex", ergebnis: 1720 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "Bent", ergebnis: 2.19 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "Bent", ergebnis: 3.82 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "Bent", ergebnis: 8.14 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "Bent", ergebnis: 8.95 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "Bent", ergebnis: 3 },
  { kategorie: "Gewandtheit", uebung: "Dribbling", name: "Bent", ergebnis: 10.28 },
];

// Define DFB benchmark data for all exercises
const benchmarkData = [
  // 10m Sprint benchmarks (lower is better)
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-97", ergebnis: 1.99 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-90", ergebnis: 2.05 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-80", ergebnis: 2.10 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-70", ergebnis: 2.13 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-60", ergebnis: 2.16 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-50", ergebnis: 2.18 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-40", ergebnis: 2.21 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-30", ergebnis: 2.24 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-20", ergebnis: 2.28 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-10", ergebnis: 2.33 },
  { kategorie: "Schnelligkeit", uebung: "10m Sprint", name: "DFB-3", ergebnis: 2.39 },
  
  // 20m Sprint benchmarks (lower is better)
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-97", ergebnis: 3.47 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-90", ergebnis: 3.57 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-80", ergebnis: 3.64 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-70", ergebnis: 3.69 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-60", ergebnis: 3.74 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-50", ergebnis: 3.78 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-40", ergebnis: 3.82 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-30", ergebnis: 3.87 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-20", ergebnis: 3.93 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-10", ergebnis: 4.01 },
  { kategorie: "Schnelligkeit", uebung: "20m Sprint", name: "DFB-3", ergebnis: 4.14 },
  
  // Gewandtheit benchmarks (lower is better)
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-97", ergebnis: 7.91 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-90", ergebnis: 8.11 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-80", ergebnis: 8.28 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-70", ergebnis: 8.42 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-60", ergebnis: 8.54 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-50", ergebnis: 8.66 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-40", ergebnis: 8.77 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-30", ergebnis: 8.90 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-20", ergebnis: 9.07 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-10", ergebnis: 9.33 },
  { kategorie: "Beweglichkeit", uebung: "Gewandtheit", name: "DFB-3", ergebnis: 9.66 },
  
  // Dribbling benchmarks (lower is better)
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-97", ergebnis: 10.43 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-90", ergebnis: 10.84 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-80", ergebnis: 11.16 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-70", ergebnis: 11.44 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-60", ergebnis: 11.68 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-50", ergebnis: 11.90 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-40", ergebnis: 12.15 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-30", ergebnis: 12.50 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-20", ergebnis: 12.84 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-10", ergebnis: 13.42 },
  { kategorie: "Technik", uebung: "Dribbling", name: "DFB-3", ergebnis: 14.37 },
  
  // Ballkontrolle benchmarks (lower is better)
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-97", ergebnis: 9.0 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-90", ergebnis: 9.66 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-80", ergebnis: 10.18 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-70", ergebnis: 10.59 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-60", ergebnis: 10.99 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-50", ergebnis: 11.36 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-40", ergebnis: 11.78 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-30", ergebnis: 12.28 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-20", ergebnis: 12.86 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-10", ergebnis: 13.81 },
  { kategorie: "Technik", uebung: "Ballkontrolle", name: "DFB-3", ergebnis: 15.29 },
  
  // Balljonglieren benchmarks (higher is better)
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-97", ergebnis: 6.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-90", ergebnis: 3.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-80", ergebnis: 2.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-50", ergebnis: 1.0 },
  { kategorie: "Technik", uebung: "Balljonglieren", name: "DFB-3", ergebnis: 0.0 },
  
  // YoYo IR1 benchmarks (higher is better)
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-97", ergebnis: 2000 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-90", ergebnis: 1800 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-80", ergebnis: 1600 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-70", ergebnis: 1400 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-60", ergebnis: 1200 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-50", ergebnis: 1000 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-40", ergebnis: 800 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-30", ergebnis: 600 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-20", ergebnis: 500 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-10", ergebnis: 450 },
  { kategorie: "Ausdauer", uebung: "YoYo IR1", name: "DFB-3", ergebnis: 400 },
];

// Combine performance and benchmark data
const allData = [...performanceData, ...benchmarkData];

// Generate a simple UUID function
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Functions for performance data processing
function isLowerBetter(exercise: string): boolean {
  // Define exercises where higher values are better
  const higherIsBetter = ["Balljonglieren", "YoYo IR1"]
  // For all other exercises, lower values are better
  return !higherIsBetter.includes(exercise)
}

/**
 * Improved percentile estimation that uses proper interpolation
 * between benchmark data points for each exercise
 */
function estimatePlayerPercentile(playerResult: number | string, exercise: string): number | null {
  try {
    // Convert player result to number
    const result = typeof playerResult === "string" 
      ? Number.parseFloat(String(playerResult).replace(/[^\d.]/g, "")) 
      : playerResult

    if (isNaN(result)) {
      return null;
    }

    // Get benchmark data for this specific exercise
    const benchmarks = allData
      .filter(item => item.uebung === exercise && item.name.startsWith("DFB"))
      .map(item => {
        // Extract percentile from DFB-XX format
        const percentileMatch = item.name.match(/DFB-(\d+)/)
        const percentile = percentileMatch ? Number.parseInt(percentileMatch[1], 10) : Number.NaN

        const benchmarkResult = typeof item.ergebnis === "string" 
          ? Number.parseFloat(String(item.ergebnis).replace(/[^\d.]/g, "")) 
          : item.ergebnis

        return { percentile, result: benchmarkResult }
      })
      .filter(item => !isNaN(item.percentile) && !isNaN(item.result))

    // If we don't have enough benchmark data, return a default percentile
    if (benchmarks.length < 2) {
      console.warn(`Not enough benchmark data for ${exercise}, defaulting to 50th percentile`);
      return 50;
    }

    // Sort benchmarks by result
    const lowerBetter = isLowerBetter(exercise);
    benchmarks.sort((a, b) => lowerBetter 
      ? a.result - b.result  // For lower is better: sort ascending by result
      : b.result - a.result  // For higher is better: sort descending by result
    );

    // Handle edge cases where the result is better than the best benchmark
    // or worse than the worst benchmark
    const worstBenchmark = lowerBetter ? benchmarks[benchmarks.length - 1] : benchmarks[benchmarks.length - 1];
    const bestBenchmark = lowerBetter ? benchmarks[0] : benchmarks[0];

    if (lowerBetter) {
      // For exercises where lower is better (sprints, agility, etc.)
      if (result <= bestBenchmark.result) {
        // Result is better than or equal to the best benchmark
        return bestBenchmark.percentile;
      }
      if (result >= worstBenchmark.result) {
        // Result is worse than or equal to the worst benchmark
        return worstBenchmark.percentile;
      }
    } else {
      // For exercises where higher is better (YoYo IR1, Balljonglieren)
      if (result >= bestBenchmark.result) {
        // Result is better than or equal to the best benchmark
        return bestBenchmark.percentile;
      }
      if (result <= worstBenchmark.result) {
        // Result is worse than or equal to the worst benchmark
        return worstBenchmark.percentile;
      }
    }

    // Find the two benchmarks the result falls between
    let lowerBenchmark: {percentile: number, result: number} | null = null;
    let upperBenchmark: {percentile: number, result: number} | null = null;

    for (let i = 0; i < benchmarks.length - 1; i++) {
      const current = benchmarks[i];
      const next = benchmarks[i + 1];

      if (lowerBetter) {
        // For exercises where lower values are better
        if (result > current.result && result <= next.result) {
          lowerBenchmark = current;
          upperBenchmark = next;
          break;
        }
      } else {
        // For exercises where higher values are better
        if (result <= current.result && result > next.result) {
          lowerBenchmark = current;
          upperBenchmark = next;
          break;
        }
      }
    }

    // If we couldn't find the right interval, use the middle value
    if (!lowerBenchmark || !upperBenchmark) {
      console.warn(`Couldn't find appropriate benchmark interval for ${exercise} with result ${result}`);
      return 50;
    }

    // Linear interpolation to estimate percentile
    const resultRange = Math.abs(upperBenchmark.result - lowerBenchmark.result);
    const percentileRange = Math.abs(upperBenchmark.percentile - lowerBenchmark.percentile);
    
    // Calculate how far the result is along the range (0 to 1)
    const position = Math.abs(result - lowerBenchmark.result) / resultRange;
    
    // Interpolate between the percentiles
    const interpolatedPercentile = lowerBenchmark.percentile - (position * percentileRange);
    
    return Math.round(interpolatedPercentile);
  } catch (error) {
    console.error("Error calculating percentile:", error);
    return null;
  }
}

function getPerformanceCategory(percentile: number | null): string {
  if (percentile === null) return "unknown"

  if (percentile < 3) return "sehr schwach"
  if (percentile < 30) return "unterdurchschnittlich"
  if (percentile < 70) return "durchschnittlich"
  if (percentile < 80) return "gut"
  if (percentile < 97) return "sehr gut"
  return "hervorragend"
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "sehr schwach":
      return "border border-red-700 text-red-700" 
    case "unterdurchschnittlich":
      return "border border-red-500 text-red-700" 
    case "durchschnittlich":
      return "border border-orange-500 text-orange-700" 
    case "gut":
      return "border border-yellow-500 text-yellow-700" 
    case "sehr gut":
      return "border border-green-400 text-green-700" 
    case "hervorragend":
      return "border border-green-500 text-green-800" 
    default:
      return "border border-gray-400 text-gray-700"
  }
}

// Function to verify calculation results and log issues
function verifyPercentileCalculation(item: any): void {
  try {
    const percentile = estimatePlayerPercentile(item.ergebnis, item.uebung);
    console.log(`${item.name} - ${item.uebung}: ${item.ergebnis} → ${percentile}% (${getPerformanceCategory(percentile)})`);
    
    // Specific check for Finley's 20m Sprint
    if (item.name === "Finley" && item.uebung === "20m Sprint") {
      if (percentile && percentile < 50) {
        console.warn(`ISSUE: Finley's 20m Sprint percentile (${percentile}%) seems too low for 3.59s`);
      }
    }
  } catch (error) {
    console.error(`Error verifying ${item.name} - ${item.uebung}:`, error);
  }
}

// Verify all results before creating users
console.log("Verifying percentile calculations:");
performanceData.forEach(verifyPercentileCalculation);

// Create users from performance data with calculated percentiles and categories
export const users = performanceData.map((item) => {
  try {
    // Generate username from name
    const username = item.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
    
    // Calculate percentile and category with error handling
    let percentile = null;
    let category = 'unknown';
    let categoryColor = 'bg-gray-400/40 text-gray-700';
    
    try {
      percentile = estimatePlayerPercentile(item.ergebnis, item.uebung);
      category = getPerformanceCategory(percentile);
      categoryColor = getCategoryColor(category);
    } catch (error) {
      console.error("Error processing performance data:", error);
    }
    
    // Assign specific roles based on name
    let role = '';
    if (item.name === 'Finley') {
      role = '3.E';
    } else if (item.name === 'Alex') {
      role = 'U10';
    } else if (item.name === 'Bent') {
      role = 'U11';
    } else {
      // Default role if none of the specific names
      const roles = ['superadmin', 'admin', 'cashier', 'manager'];
      role = roles[Math.floor(Math.random() * roles.length)];
    }
    
    // Generate dates
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
    const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 1000000000));
    
    return {
      id: generateUUID(),
      firstName: item.name || 'Unknown',
      lastName: item.uebung || 'Unknown',
      username,
      email: `${username}@example.com`,
      phoneNumber: `+${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`,
      status: category as UserStatus, // Use category as status
      role,
      createdAt,
      updatedAt,
      kategorie: item.kategorie || 'Unknown',
      uebung: item.uebung || 'Unknown',
      ergebnis: typeof item.ergebnis === 'number' ? item.ergebnis : 0,
      percentile,
      categoryColor
    };
  } catch (error) {
    console.error("Error creating user:", error);
    // Return a fallback user object if there's an error
    return {
      id: generateUUID(),
      firstName: 'Error',
      lastName: 'Processing',
      username: 'error',
      email: 'error@example.com',
      phoneNumber: '+0-0000-0000',
      status: 'unknown' as UserStatus,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      kategorie: 'Unknown',
      uebung: 'Unknown',
      ergebnis: 0,
      percentile: null,
      categoryColor: 'bg-gray-400/40 text-gray-700'
    };
  }
});
