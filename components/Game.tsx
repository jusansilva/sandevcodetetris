import { Text, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import Menu from "@/components/Menu";
import { useGameOver } from "@/hooks/useGameOver";
import Tetris from "@/components/Tetris"

interface GameProps {
  rows: number;
  columns: number;
}

export default function Game({ rows, columns }: GameProps) {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();
  return (
    <ThemedView style={styles.menu}>
      {gameOver?(
      <Menu onClick={start} />
      ):(
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    menu:{
        backgroundColor: '#292929',
    }
});
