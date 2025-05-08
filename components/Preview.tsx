import React from "react";
import { Dimensions, StyleSheet, View } from 'react-native';

import { buildBoard } from "@/app/business/Board";
import { transferToBoard } from "@/app/business/Tetrominoes";

import BoardCell from "@/components/BoardCell";
const { width, height } = Dimensions.get('window');

interface Tetromino {
  shape: number[][];
  className: string;
}

interface PreviewProps {
  tetromino: Tetromino;
  index: number;
}

const Preview: React.FC<PreviewProps> = ({ tetromino, index }) => {
  const { shape, className } = tetromino;

  const board = buildBoard({ rows: 4, columns: 4 });

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape
  });

  return (
    <View style={[styles.Preview]}>
      <View style={styles.PreviewBoard}>
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} board={board}/>
          ))
        )}
      </View>
    </View>
  );
};

export default React.memo(Preview);

const styles = StyleSheet.create({
  Preview: {
    display: "none",
    position: 'absolute',
    top:  width * 0.08,
    left: width * 0.6, 
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 10,
  },

  PreviewBoard: {
    display: 'flex', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.11,
    height: height * 0.11,
    gap: 2, 
  },
});
