import { Platform } from 'react-native';
const isWeb = Platform.OS === 'web'? true:false

export const Action = {
    Left: "Left",
    FastDrop: "FastDrop",
    Pause: "Pause",
    Quit: "Quit",
    Right: "Right",
    Rotate: "Rotate",
    SlowDrop: "SlowDrop"
  };
  
  export const Key = {
    ArrowUp: Action.Rotate,
    ArrowDown: Action.SlowDrop,
    ArrowLeft: Action.Left,
    ArrowRight: Action.Right,
    KeyQ: Action.Quit,
    KeyP: Action.Pause,
    Space: Action.FastDrop
  }

  export const handleGesture = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    if (translationX > 30) {
      console.log(Action.Right);
    } else if (translationX < -30) {
      console.log(Action.Left);
    } else if (translationY > 30) {
      console.log(Action.SlowDrop);
    } else if (translationY < -30) {
      console.log(Action.Rotate);
    }
  };
  
  export const actionIsDrop = (action: string) =>
    [Action.SlowDrop, Action.FastDrop].includes(action);
  
  export const actionForKey = (keyCode: keyof typeof Key) => Key[keyCode];
  