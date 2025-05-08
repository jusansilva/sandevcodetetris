import defaultCell from "@/app/business/Cell";
import { movePlayer } from "@/app/business/PlayerController";
import { transferToBoard } from "@/app/business/Tetrominoes";

export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: builtRows,
    size: { rows, columns }
  };
};

const findDropPosition = ({
  board,
  position,
  shape
}: {
  board: Board;
  position: { row: number; column: number };
  shape: number[][];
}) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

export const nextBoard = ({
  board,
  player,
  resetPlayer,
  addLinesCleared
}: {
  board: Board;
  player: {
    tetromino: { shape: number[][]; className: string };
    position: { row: number; column: number };
    isFastDropping: boolean;
    collided: boolean;
  };
  resetPlayer: () => void;
  addLinesCleared: (lines: number) => void;
}) => {
  const { tetromino, position } = player;

  // Copy and clear spaces used by pieces that
  // hadn't collided and occupied spaces permanently
  let rows = board.rows.map((row: { occupied: boolean }[]) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // Drop position
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape
  });

  // Place ghost
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape
  });

  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape
    });
  }

  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  rows = rows.reduce((acc: typeof rows, row: { occupied: boolean }[]) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  if (player.collided || player.isFastDropping) {
  
    resetPlayer();
  }

  return {
    rows,
    size: { ...board.size }
  };
};

export const hasCollision = ({
  board,
  position,
  shape
}: {
  board: Board;
  position: { row: number; column: number };
  shape: number[][];
}) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

interface Board {
  rows: Array<Array<{ occupied: boolean }>>;
  size: { rows: number; columns: number };
}

export const isWithinBoard = ({
  board,
  position,
  shape
}: {
  board: Board;
  position: { row: number; column: number };
  shape: number[][];
}) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
