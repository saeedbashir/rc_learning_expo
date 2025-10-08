// components/home/WatchlistButton.tsx
import { WatchlistButton, WatchlistButtonText } from '@/theme/styles/movieDetailStyles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type Props = {
  inWatchlist: boolean;
  onPress: () => void;
};

const WatchlistToggleButton: React.FC<Props> = ({ inWatchlist, onPress }) => {
  return (
    <WatchlistButton inWatchlist={inWatchlist} onPress={onPress}>
      <Ionicons name={inWatchlist ? 'checkmark' : 'add'} size={20} color="#fff" />
      <WatchlistButtonText>
        {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </WatchlistButtonText>
    </WatchlistButton>
  );
};

export default WatchlistToggleButton;
