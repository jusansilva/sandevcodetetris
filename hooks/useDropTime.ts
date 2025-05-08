import { useState, useCallback, useEffect } from "react";

const defaultDropTime = 1000;
const minimumDropTime = 100;
const speedIncrement = 50;

interface GameStats {
  level: number;
}

export const useDropTime = ({ gameStats }: { gameStats: GameStats }) => {
  const [dropTime, setDropTime] = useState<number | null>(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState<number | undefined>(undefined);

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(undefined);
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  useEffect(() => {
    const speed = speedIncrement * (gameStats.level - 1);
    const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);

    setDropTime(newDropTime);
  }, [gameStats.level, setDropTime]);

  return [dropTime, pauseDropTime, resumeDropTime];
};
