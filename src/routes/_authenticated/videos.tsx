"use client";

import { createFileRoute } from '@tanstack/react-router';
import { GenericExpandableCard } from '@/components/ui/generic-expandable-card';
import { Main } from '@/components/layout/main';
import { Header } from '@/components/layout/header';
import { ThemeSwitch } from '@/components/theme-switch';
import { finleyCardsData, bentCardsData } from '@/data/testimonials'; // Import actual data

// Renamed the component to be used with createFileRoute
function VideosPageComponent() {
  // Placeholder data - this will be replaced with actual data
  // const finleyCardsData: CardData[] = []; 
  // const bentCardsData: CardData[] = [];

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main className="h-full overflow-auto p-4 md:p-8">
        <div className="container mx-auto py-8 space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Finley Videos</h2>
            {finleyCardsData.length > 0 ? (
              <GenericExpandableCard cardsData={finleyCardsData} themeColor="green" />
            ) : (
              <p>No Finley videos available at the moment.</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Bent Videos</h2>
            {bentCardsData.length > 0 ? (
              <GenericExpandableCard cardsData={bentCardsData} themeColor="blue" />
            ) : (
              <p>No Bent videos available at the moment.</p>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}

export const Route = createFileRoute('/_authenticated/videos')({
  component: VideosPageComponent,
}); 