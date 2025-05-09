"use client";
import { Main } from '@/components/layout/main'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { GenericExpandableCard, CardData } from '@/components/ui/generic-expandable-card'
import { useState } from 'react';
import { testimonials as testimonialData, finleyCardsData as finleyCardData, bentCardsData as bentCardData } from '@/data/testimonials';
import { Header } from '@/components/layout/header'
import { ThemeSwitch } from '@/components/theme-switch'

export default function Tasks() {
  const [showExpandableCard, setShowExpandableCard] = useState(false);
  const [selectedTestimonialCardType, setSelectedTestimonialCardType] = useState<string | null>(null);
  
  const handleTestimonialClick = (cardType: string) => {
    setSelectedTestimonialCardType(cardType);
    setShowExpandableCard(true);
  };
  
  const handleBackToTestimonials = () => {
    setShowExpandableCard(false);
    setSelectedTestimonialCardType(null);
  };

  let currentCardsData: CardData[] = [];
  let currentThemeColor: "blue" | "green" = "blue";

  if (selectedTestimonialCardType === "finley") {
    currentCardsData = finleyCardData;
    currentThemeColor = "green";
  } else if (selectedTestimonialCardType === "bent") {
    currentCardsData = bentCardData;
    currentThemeColor = "blue";
  }

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main className="h-full overflow-auto">
        <div className="container mx-auto py-8">
          {showExpandableCard && selectedTestimonialCardType ? (
            <>
              <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold">Übung: {selectedTestimonialCardType.charAt(0).toUpperCase() + selectedTestimonialCardType.slice(1)}</h2>
                <button 
                  onClick={handleBackToTestimonials}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full text-sm font-medium transition-colors"
                  aria-label="Back to testimonials"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back
                </button>
              </div>
              <GenericExpandableCard cardsData={currentCardsData} themeColor={currentThemeColor} />
            </>
          ) : (
            <div className="cursor-pointer">
              <AnimatedTestimonials 
                testimonials={testimonialData.map(t => ({
                  ...t,
                  onClick: () => handleTestimonialClick(t.cardType || t.name.toLowerCase())
                }))} 
              />
            </div>
          )}
        </div>
      </Main>
    </>
  )
} 