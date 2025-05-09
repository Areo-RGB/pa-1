"use client";
import { Main } from '@/components/layout/main'
import { GenericExpandableCard, CardData } from '@/components/ui/generic-expandable-card'
import { useState } from 'react';
import { bentCardsData as bentCardData } from '@/data/testimonials';
import { Header } from '@/components/layout/header'
import { ThemeSwitch } from '@/components/theme-switch'

export default function Bent() {
  const [showExpandableCard, setShowExpandableCard] = useState(true);

  let currentCardsData: CardData[] = bentCardData;
  let currentThemeColor: "blue" = "blue";

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main className="h-full overflow-auto">
        <div className="container mx-auto py-8">
          {showExpandableCard && (
            <>
              <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold">Übung: Bent</h2>
              </div>
              <GenericExpandableCard cardsData={currentCardsData} themeColor={currentThemeColor} />
            </>
          )}
        </div>
      </Main>
    </>
  )
}