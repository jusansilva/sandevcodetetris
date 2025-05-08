import { Text, StyleSheet, Alert, View, TouchableOpacity, Platform, Button } from "react-native";
import Board from "@/components/Board";
import GameStats from "@/components/GameStats";

import { useBoard } from "@/hooks/useBoard";
import { useGameStats } from "@/hooks/useGameStats";
import { usePlayer } from "@/hooks/usePlayer";
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import GameController from "./GameController";
import React from "react";
import { handleGesture } from "@/app/business/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
const isWeb = Platform.OS === "web" ? true : false;

interface TetrisProps {
  rows: number;
  columns: number;
  setGameOver: (gameOver: boolean) => void;
}

export default function Tetris({ rows, columns, setGameOver }: TetrisProps) {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer() as [
    {
      collided: boolean;
      isFastDropping: boolean;
      position: { row: number; column: number };
      tetrominoes: any[];
      tetromino: any;
    },
    React.Dispatch<
      React.SetStateAction<{
        collided: boolean;
        isFastDropping: boolean;
        position: { row: number; column: number };
        tetrominoes: any[];
        tetromino: any;
      }>
    >,
    () => void
  ];
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });

  const close = async () => {
      setGameOver(true)
    if(isWeb){
      await localStorage.clear();
    }else{
      await AsyncStorage.clear();
    }
  }
  return (
    <GestureHandlerRootView style={styles.tetris}>
      <TouchableOpacity onPress={close} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Board board={board} />
      </PanGestureHandler>

      <GameStats gameStats={gameStats} />
      {/* <Previews tetrominoes={player?.tetrominoes} /> */}
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tetris: {
    backgroundColor: "#292929",
    position: "relative",
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
