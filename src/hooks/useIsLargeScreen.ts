// src/hooks/useIsLargeScreen.ts
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(Dimensions.get('window').width >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(Dimensions.get('window').width >= 768);
    };

    // Add event listener for screen dimension changes
    const subscription = Dimensions.addEventListener('change', handleResize);

    // Clean up event listener on unmount
    return () => {
      subscription?.remove();
    };
  }, []);

  return isLargeScreen;
}
