import { useState, useEffect } from "react";

import { buildBoard, nextBoard, Board } from "@/app/business/Board";

interface UseBoardProps {
  rows: number;
  columns: number;
  player: any; 
  resetPlayer: () => void;
  addLinesCleared: (lines: number) => void;
}

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared
}: UseBoardProps) => {
  const [board, setBoard] = useState<Board>(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard: Board) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
