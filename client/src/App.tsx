import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingScreen from "./pages/LoadingScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import TicTacToeScreen from "./pages/TicTacToeScreen";
import LetterScreen from "./pages/LetterScreen";
import SongsScreen from "./pages/SongsScreen";
import CardFlipScreen from "./pages/CardFlipScreen";
import FinalMessageScreen from "./pages/FinalMessageScreen";
import WrappingScreen from "./pages/WrappingScreen"; // <-- sahi import
import SealedScreen from "./pages/SealedScreen";

type ScreenType = 
  | 'loading'
  | 'welcome'
  | 'tictactoe'
  | 'letter'
  | 'songs'
  | 'cardflip'
  | 'finalmessage'
  | 'wrapping'  
  | 'sealed';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('loading');

  const handleScreenTransition = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleRestart = () => {
    setCurrentScreen('loading');
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          
          {currentScreen === 'loading' && (
            <LoadingScreen onComplete={() => handleScreenTransition('welcome')} />
          )}
          {currentScreen === 'welcome' && (
            <WelcomeScreen onNext={() => handleScreenTransition('tictactoe')} />
          )}
          {currentScreen === 'tictactoe' && (
            <TicTacToeScreen onNext={() => handleScreenTransition('letter')} />
          )}
          {currentScreen === 'letter' && (
            <LetterScreen onNext={() => handleScreenTransition('songs')} />
          )}
          {currentScreen === 'songs' && (
            <SongsScreen onNext={() => handleScreenTransition('cardflip')} />
          )}
          {currentScreen === 'cardflip' && (
            <CardFlipScreen onNext={() => handleScreenTransition('finalmessage')} />
          )}
          {currentScreen === 'finalmessage' && (
            <FinalMessageScreen
              onNext={() => handleScreenTransition('wrapping')}
              onRestart={handleRestart}
            />
          )}
          {currentScreen === 'wrapping' && (
            <WrappingScreen onComplete={() => handleScreenTransition('sealed')} />
          )}
          {currentScreen === 'sealed' && (
            <SealedScreen onRestart={handleRestart} />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;