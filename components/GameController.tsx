
import { Action, actionForKey, actionIsDrop } from "@/app/business/Input";
import { playerController } from "@/app/business/PlayerController";
import { StyleSheet } from 'react-native';

import { useDropTime } from "@/hooks/useDropTime";
import { useInterval } from "@/hooks/useInterval";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, typeof dropTime === 'number' ? dropTime : null);

  const onKeyUp = ({ code }: { code: string }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action) && typeof resumeDropTime === 'function') resumeDropTime();
  };

  const onKeyDown = ({ code }: { code: string }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        if (typeof pauseDropTime === 'function') pauseDropTime();
      } else {
        if (typeof resumeDropTime === 'function') resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action) && typeof pauseDropTime === 'function') pauseDropTime();
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;



const styles = StyleSheet.create({
    GameController:{
        position: "absolute"
    }
});