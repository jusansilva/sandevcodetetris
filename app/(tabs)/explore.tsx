import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Game from '@/components/Game'
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function TabTwoScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.stepContainer}>
        <Game rows={20} columns={10} />
      </ThemedView>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    color: '#fff',
    backgroundColor: '#292929',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
