"use client"

import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Film, X, ChevronDown, Clock, ArrowUp, ArrowDown, ArrowRight } from "lucide-react"
import {
  estimatePlayerPercentile,
  getPerformanceCategory,
  getGradientColor,
  getGradientTextColor,
} from "@/features/chats/data/data"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Exercise {
  id: string;
  title: string;
}

export interface PerformanceData {
  name: string;
  ergebnis: number | string;
  kategorie?: string;
}

export interface PerformanceRankingProps {
  title: string;
  displayTitle?: string;
  data: PerformanceData[];
  className?: string;
  unit?: string;
  sortAscending?: boolean;
  onExerciseChange?: (exercise: string) => void;
  availableExercises?: Exercise[];
}

/**
 * PerformanceRanking component displays a ranking of performance data
 * and provides video playback functionality for associated videos.
 */
export default function PerformanceRanking({
  title,
  displayTitle,
  data,
  className,
  unit = "s",
  sortAscending = true,
  onExerciseChange,
  availableExercises = [],
}: PerformanceRankingProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [currentVideoItem, setCurrentVideoItem] = useState<number | null>(null)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [showCategoryLegend, setShowCategoryLegend] = useState(false)
  const [showComparisonOverlay, setShowComparisonOverlay] = useState(false)
  const [showPreviousRanking, setShowPreviousRanking] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'none' | 'fadeOut' | 'fadeIn' | 'complete'>('none')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  
  // Mock previous ranking date
  const previousRankingDate = "12. April 2024"
  
  // Sort data based on result
  const sortedData = [...data].sort((a, b) => {
    const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
    const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
    return sortAscending ? aResult - bResult : bResult - aResult
  })

  // Mock previous ranking data - this would normally come from an API
  const previousRankingData = useMemo(() => {
    // Deep clone the current data and make modifications for previous state
    const prevData = JSON.parse(JSON.stringify(data))
    
    // Adjust results to create different positions
    return prevData.map((item: any) => {
      // For specific players, modify their results to reflect different positions
      if (item.name === "Finley") {
        const newValue = Number(item.ergebnis) + 0.5 // Make it worse (higher time)
        return { ...item, ergebnis: newValue }
      }
      if (item.name === "Alex") {
        const newValue = Number(item.ergebnis) + 0.2 // Make it worse (higher time)
        return { ...item, ergebnis: newValue }
      }
      if (item.name === "Tom") {
        const newValue = Number(item.ergebnis) - 0.2 // Make it better (lower time)
        return { ...item, ergebnis: newValue }
      }
      
      return item
    })
  }, [data])
  
  // Sort previous ranking data
  const sortedPreviousData = useMemo(() => {
    return [...previousRankingData].sort((a, b) => {
      const aResult = typeof a.ergebnis === "string" ? Number.parseFloat(a.ergebnis) : a.ergebnis
      const bResult = typeof b.ergebnis === "string" ? Number.parseFloat(b.ergebnis) : b.ergebnis
      return sortAscending ? aResult - bResult : bResult - aResult
    })
  }, [previousRankingData, sortAscending])

  // Handle targeted animation between previous and current rankings
  useEffect(() => {
    if (showPreviousRanking && animationPhase === 'none') {
      // After 1.5 seconds, start the fade out phase
      const timer = setTimeout(() => {
        setAnimationPhase('fadeOut')
        
        // After fade out, prepare for fade in
        const fadeOutTimer = setTimeout(() => {
          setShowPreviousRanking(false)
          setAnimationPhase('fadeIn')
          
          // After fade in, complete animation
          const fadeInTimer = setTimeout(() => {
            setAnimationPhase('complete')
            
            // Reset after showing complete state for a while
            const resetTimer = setTimeout(() => {
              setAnimationPhase('none')
            }, 3000)
            
            return () => clearTimeout(resetTimer)
          }, 400)
          
          return () => clearTimeout(fadeInTimer)
        }, 500)
        
        return () => clearTimeout(fadeOutTimer)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [showPreviousRanking, animationPhase])

  // Map player names to their positions in current and previous rankings
  const playerPositions = useMemo(() => {
    const positions = new Map()
    
    // Get positions from current data
    sortedData
      .filter(item => !item.name.startsWith("DFB"))
      .forEach((item, index) => {
        positions.set(item.name, { current: index + 1 })
      })
    
    // Get positions from previous data
    sortedPreviousData
      .filter(item => !item.name.startsWith("DFB"))
      .forEach((item, index) => {
        const playerData = positions.get(item.name) || {}
        positions.set(item.name, { ...playerData, previous: index + 1 })
      })
    
    return positions
  }, [sortedData, sortedPreviousData])

  // Create a mapping of videos for each data item
  const itemVideoMap = useMemo(() => {
    const defaultMap: Record<number, string> = {}
    
    // Map each item to a video based on player and exercise
    sortedData.forEach((item, index) => {
      // Default fallback video
      defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/g.mp4"
      
      // Alex's videos
      if (item.name === "Alex") {
        if (title === "10m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/Timeline%201sprint.bent_prob4_tvai.mp4"
        } else if (title === "20m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/20.mp4"
        } else if (title === "Balljonglieren") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/6%20(2).mp4"
        } else if (title === "Dribbling") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/2%20-%20(1x1)_3.mp4"
        }
      }
      
      // Bent's videos
      else if (item.name === "Bent") {
        if (title === "Balljonglieren") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/bent1/bent.jong.mp4"
        } else if (title === "10m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/Finley.Time/bent.20m.mp4"
        } else if (title === "20m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/bent1/lirdy.mp4"
        } else if (title === "Dribbling") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/2%20-%20(1x1)_3.mp4"
        }
      }
      
      // Finley's videos
      else if (item.name === "Finley") {
        if (title === "10m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/Finley.Time/finley.gw.mp4"
        }
      }
      
      // Other players' default exercise videos
      else {
        if (title === "10m Sprint" || title === "20m Sprint") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/20.mp4"
        } else if (title === "Balljonglieren") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/6%20(2).mp4"
        } else if (title === "Dribbling") {
          defaultMap[index] = "https://data3.fra1.cdn.digitaloceanspaces.com/2%20-%20(1x1)_3.mp4"
        }
      }
    })
    
    return defaultMap
  }, [sortedData, title])

  // Handle toggling video play/pause
  const handleToggleVideo = (index: number) => {
    // Don't allow video during transitions
    if (showPreviousRanking || animationPhase !== 'none') return
    
    // Always set the current item first
    setCurrentVideoItem(index)
    
    // Get the video URL for this item
    const videoUrl = itemVideoMap[index] || "https://data3.fra1.cdn.digitaloceanspaces.com/g.mp4"
    
    // If we're already playing this item, stop the video
    if (currentVideoItem === index && isPlayingVideo) {
      setIsPlayingVideo(false)
      setCurrentVideoUrl(null)
    } else {
      // Otherwise start playing the selected video
      setCurrentVideoUrl(videoUrl)
      setIsPlayingVideo(true)
    }
  }

  // Generate gradient legend items with performance categories
  const gradientLegendItems = [
    { category: "unterdurchschnittlich", color: "bg-red-600/60", percentileRange: "3-30%" },
    { category: "durchschnittlich", color: "bg-orange-500/60", percentileRange: "31-70%" },
    { category: "gut", color: "bg-yellow-500/60", percentileRange: "71-80%" },
    { category: "sehr gut", color: "bg-green-500/60", percentileRange: "81-90%" },
    { category: "ausgezeichnet", color: "bg-green-600/60", percentileRange: "91-97%" },
  ]

  // Start comparison transition
  const handleStartComparison = () => {
    setShowCategoryLegend(false)
    if (showComparisonOverlay) {
      setShowComparisonOverlay(false)
    } else {
      setShowComparisonOverlay(true)
      setShowPreviousRanking(false)
      setAnimationPhase('none')
    }
  }

  // Start animation transition
  // const handleStartAnimation = () => {
  //   setShowCategoryLegend(false)
  //   setShowComparisonOverlay(false)
  //   setShowPreviousRanking(true)
  //   setAnimationPhase('none')
  // }

  // Determine which data set to show
  const displayData = showPreviousRanking ? sortedPreviousData : sortedData

  // Find the position 2 entry for special animation
  const position2CurrentPlayerName = sortedData[1]?.name // Get player currently at position 2 (index 1)

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-card rounded-xl border border-border",
        "shadow-md",
        "relative",
        "overflow-hidden",
        "min-h-[350px] h-[calc(100vh-8rem)] max-h-[844px]",
        className,
      )}
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/5 to-transparent -z-10 rounded-bl-full"></div>

      {/* Video Overlay - Full component dimensions */}
      {isPlayingVideo && currentVideoUrl && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <video
            src={currentVideoUrl}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Card Content */}
      <div className={cn(
        isPlayingVideo ? "relative z-20 h-full" : "p-3 sm:p-4 h-full",
      )}>
        {/* Close video button */}
        {isPlayingVideo && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsPlayingVideo(false)
              setCurrentVideoItem(null)
              setCurrentVideoUrl(null)
            }}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black/95 text-white z-20"
            aria-label="Close video"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        )}

        {/* Title section */}
        <div className={cn(
          isPlayingVideo ? "px-3 sm:px-4 py-2 sm:py-3" : "mb-4"
        )}>
          <div className="flex items-center justify-between">
            {/* Exercise Selection */}
            <Select
              value={title}
              onValueChange={(value) => {
                if (onExerciseChange) {
                  onExerciseChange(value)
                }
              }}
            >
              <SelectTrigger
                className={cn(
                  "w-[140px] sm:w-[180px] h-7 sm:h-8 text-xs sm:text-sm",
                  isPlayingVideo ? "text-white [text-shadow:_0_1px_1px_rgb(0_0_0_/_90%)]" : "text-card-foreground"
                )}
              >
                <SelectValue>{displayTitle || title}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableExercises.map((exercise) => (
                  <SelectItem key={exercise.id} value={exercise.title}>
                    {exercise.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Show date indicator when viewing previous ranking */}
            {showPreviousRanking && (
              <div className="flex items-center px-2 py-1 rounded-full bg-muted text-[10px] sm:text-xs font-medium text-muted-foreground">
                <Clock className="w-3 h-3 mr-1.5" />
                {previousRankingDate}
              </div>
            )}
          </div>
          
          {/* Only show controls when video is not playing */}
          {!isPlayingVideo && animationPhase === 'none' && (
            <div className="flex justify-start mt-2">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="text-[10px] sm:text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Entwicklung
                    <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="text-[10px] sm:text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStartComparison()
                        setIsPopoverOpen(false)
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors w-full text-left"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Vergleich mit {previousRankingDate}</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Simplified Gradient Legend - only show when video is not playing */}
        {showCategoryLegend && !isPlayingVideo && animationPhase === 'none' && !showComparisonOverlay && (
          <div 
            className="mb-4 p-3 bg-card/50 rounded-lg text-xs border border-border/50 animate-in slide-in-from-top duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent legend clicks from toggling video
          >
            <div className="font-medium mb-2 text-card-foreground">Entwicklung:</div>
            <div className="flex items-center mb-3">
              <div className="h-4 flex-1 bg-gradient-to-r from-red-600/60 via-orange-500/60 to-green-600/60 rounded-sm"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2">
              {gradientLegendItems.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={`w-2 h-4 rounded-sm ${item.color}`}></div>
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Side-by-side Comparison Overlay */}
        {showComparisonOverlay && !isPlayingVideo && (
          <div 
            className="mb-4 bg-card/50 rounded-lg text-xs border border-border/50 animate-in slide-in-from-top duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 pb-2 border-b border-border/50 flex items-center justify-between">
              <div className="font-medium text-card-foreground">Ranking-Vergleich:</div>
              <button 
                onClick={() => setShowComparisonOverlay(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 divide-x divide-border/50">
              {/* Previous Ranking */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground font-medium">{previousRankingDate}</span>
                  <span className="bg-muted px-2 py-0.5 rounded-full text-[10px]">Alt</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {sortedPreviousData
                    .filter(item => !item.name.startsWith("DFB"))
                    .map((item, index) => {
                      const percentile = estimatePlayerPercentile(item.ergebnis, title)
                      const indicatorColor = getGradientColor(percentile)
                      
                      return (
                        <div
                          key={`prev-${item.name}-${index}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 relative"
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${indicatorColor} rounded-l-lg`}></div>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-card-foreground text-xs font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium text-card-foreground truncate">
                              {item.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-medium">
                              {item.ergebnis}{unit}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              
              {/* Current Ranking with Change Indicators */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground font-medium">Aktuell</span>
                  <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] text-primary-foreground">Neu</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {sortedData
                    .filter(item => !item.name.startsWith("DFB"))
                    .map((item, index) => {
                      const percentile = estimatePlayerPercentile(item.ergebnis, title)
                      const indicatorColor = getGradientColor(percentile)
                      
                      // Get position in previous ranking for comparison
                      const positionData = playerPositions.get(item.name)
                      const hasPositionChange = positionData && 
                                               positionData.current !== undefined && 
                                               positionData.previous !== undefined && 
                                               positionData.current !== positionData.previous
            
                      const positionChange = hasPositionChange 
                        ? positionData.previous - positionData.current 
                        : 0
            
                      return (
                        <div
                          key={`current-${item.name}-${index}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 relative"
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${indicatorColor} rounded-l-lg`}></div>
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-card-foreground text-xs font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium text-card-foreground truncate">
                              {item.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {positionChange !== 0 && (
                              <div className={cn(
                                "flex items-center",
                                positionChange > 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {positionChange > 0 ? (
                                  <ArrowUp className="w-3 h-3" />
                                ) : (
                                  <ArrowDown className="w-3 h-3" />
                                )}
                                <span className="text-[10px] font-medium">{Math.abs(positionChange)}</span>
                              </div>
                            )}
                            <span className="text-[11px] font-medium">
                              {item.ergebnis}{unit}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-border/50 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-green-500">
                  <ArrowUp className="w-3 h-3" />
                  <span className="font-medium">2</span>
                </div>
                <span>= Verbesserung um 2 Plätze</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-red-500">
                  <ArrowDown className="w-3 h-3" />
                  <span className="font-medium">1</span>
                </div>
                <span>= Verschlechterung um 1 Platz</span>
              </div>
            </div>
          </div>
        )}

        {/* Performance Data List */}
        <div className={cn(
          "space-y-1.5 sm:space-y-2 relative",
          isPlayingVideo 
            ? "absolute bottom-0 left-0 right-0 h-[240px] sm:h-[280px] overflow-y-auto p-3 sm:p-4 [&_*]:text-white [&_*]:[text-shadow:_0_1px_1px_rgb(0_0_0_/_90%)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            : "h-[calc(100%-2rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          showComparisonOverlay ? "opacity-20 pointer-events-none" : ""
        )}>
          {displayData
            .filter(item => !isPlayingVideo || !item.name.startsWith("DFB"))
            .map((item, index) => {
            const isBenchmark = item.name.startsWith("DFB")
            const percentile = isBenchmark
              ? Number.parseInt(item.name.split("-")[1] || "0", 10)
              : estimatePlayerPercentile(item.ergebnis, title)

            // Get category for display
            const category = getPerformanceCategory(percentile)

            // Get gradient colors
            const indicatorColor = getGradientColor(percentile)
            const textColor = isPlayingVideo ? "text-white" : getGradientTextColor(percentile)

            // Determine border color based on percentile
            let borderColorClass = "border-muted-foreground/40"
            if (percentile !== null && !isBenchmark) {
              if (percentile < 31) borderColorClass = "border-red-600/60"
              else if (percentile < 71) borderColorClass = "border-orange-500/60"
              else if (percentile < 81) borderColorClass = "border-yellow-500/60"
              else if (percentile < 91) borderColorClass = "border-green-500/60"
              else borderColorClass = "border-green-600/60"
            }

            // Get display index - important for numbering when filtering
            const displayIndex = displayData
              .filter(i => !isPlayingVideo || !i.name.startsWith("DFB"))
              .indexOf(item)
            
            // Get actual index for video handling
            const actualIndex = displayData.indexOf(item)
            const isActive = currentVideoItem === actualIndex
            
            // Get position change data if available
            const positionData = !isBenchmark ? playerPositions.get(item.name) : null
            const hasPositionChange = positionData && 
                                     positionData.current !== undefined && 
                                     positionData.previous !== undefined && 
                                     positionData.current !== positionData.previous
            
            const positionChange = hasPositionChange 
              ? positionData.previous - positionData.current 
              : 0
            
            return (
              <div
                key={`${item.name}-${index}`}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2.5 rounded-lg",
                  !isBenchmark ? "hover:bg-muted/50 cursor-pointer" : "",
                  "relative",
                  isActive && isPlayingVideo ? "bg-white/10 hover:bg-white/20 animate-pulse" : 
                  isPlayingVideo ? "hover:bg-white/10 border border-white/20" : 
                  isBenchmark ? "" : "bg-muted/30 border border-border/30",
                  isPlayingVideo && !isBenchmark ? "animate-in fade-in slide-in-from-left-5" : "",
                  (animationPhase !== 'none' && item.name === position2CurrentPlayerName) ? 
                    "transition-opacity duration-500" : "transition-colors duration-300",
                  animationPhase === 'complete' && item.name === "Finley" ? "bg-muted/30" : ""
                )}
                onClick={(e) => {
                  e.stopPropagation() // Prevent clicks from bubbling to parent
                  if (!isBenchmark && animationPhase === 'none' && !showPreviousRanking) { 
                    // Only allow videos for players when not in comparison mode
                    handleToggleVideo(actualIndex)
                  }
                }}
              >
                {/* Gradient Indicator - only for player entries */}
                {!isBenchmark && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${indicatorColor} rounded-l-lg transition-all duration-300`}
                    title={`${percentile}% - ${category}`}
                  ></div>
                )}

                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    "border-2",
                    isPlayingVideo ? "border-white/30" : borderColorClass,
                    isActive && isPlayingVideo 
                      ? "bg-primary text-primary-foreground scale-110" 
                      : isBenchmark 
                        ? isPlayingVideo ? "bg-transparent text-white" : "bg-transparent text-muted-foreground" 
                        : isPlayingVideo ? "bg-white/20 text-white" : "bg-muted text-card-foreground",
                    "text-sm font-semibold",
                    "group-hover:scale-105",
                    "transition-all"
                  )}
                >
                  {isActive && isPlayingVideo ? (
                    <Film className="w-4 h-4 animate-in zoom-in duration-300" />
                  ) : (
                    <span>{displayIndex + 1}</span>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0 transition-all duration-300">
                  <div className="space-y-0.5">
                    <h3 className={cn(
                      "text-xs font-medium", 
                      isPlayingVideo ? "text-white bg-black/40 px-2 py-0.5 rounded inline-block" : "text-card-foreground",
                      "transition-colors duration-300"
                    )}>
                      {item.name}
                      {isBenchmark && percentile && (
                        <span className={cn(
                          "ml-1 text-[10px]", 
                          isPlayingVideo ? "text-white/70" : "text-muted-foreground",
                          "transition-colors duration-300"
                        )}>
                          (P{percentile})
                        </span>
                      )}
                      {!isBenchmark && percentile && (
                        <span className={`ml-1 text-[10px] ${textColor} transition-colors duration-300`}>
                          (P{percentile} - {category})
                        </span>
                      )}
                    </h3>
                    <p className={cn(
                      "text-[11px]",
                      isPlayingVideo ? "text-white/70 bg-black/40 px-2 py-0.5 rounded inline-block" : "text-muted-foreground",
                      "transition-colors duration-300"
                    )}>
                      {isBenchmark ? "DFB Benchmark" : item.kategorie}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    {/* Position change indicator (shown after animation is complete) */}
                    {!showPreviousRanking && hasPositionChange && (animationPhase === 'complete' || animationPhase === 'none') && (
                      <div className={cn(
                        "flex items-center mr-1.5",
                        positionChange > 0 ? "text-green-500" : "text-red-500",
                        animationPhase === 'complete' && item.name === "Finley" ? "animate-pulse" : ""
                      )}>
                        {positionChange > 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <span className="text-[10px] font-medium">{Math.abs(positionChange)}</span>
                      </div>
                    )}
                    
                    <span className={cn(
                      "text-xs font-medium", 
                      isPlayingVideo 
                        ? "text-white bg-black/40 px-2 py-0.5 rounded" 
                        : !isBenchmark ? textColor : "text-card-foreground",
                      "transition-colors duration-300"
                    )}>
                      {item.ergebnis}
                      {unit}
                    </span>

                    {/* Video indicator */}
                    {!isBenchmark && !isPlayingVideo && animationPhase === 'none' && !showPreviousRanking && (
                      <Film className="w-3 h-3 ml-1 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 