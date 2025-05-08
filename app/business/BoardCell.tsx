import { StyleSheet, View } from "react-native";

interface Cell {
  className: string;
}

export default function BoardCell({ cell }: { cell: Cell }) {
  return (
    <View style={[styles.BoardCell, styles[cell.className] || {}]}>
      <View style={styles.Sparkle}></View>
    </View>
  );
}

const styles: { [key: string]: any } = StyleSheet.create({
  BoardCell: {
    width: "auto",
    borderRadius: 6,
    position: "relative",
  },

  tetromino: {
    borderTopWidth: 3,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderLeftWidth: 3,
    borderLeftColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderRightWidth: 3,
    borderRightColor: "rgba(0, 0, 0, 0.1)",
  },

  Sparkle: {
    position: "absolute",
    zIndex: 10,
    width: 6,
    height: 6,
    left: -2,
    top: -2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 4,
  },

  ghost: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  ghostSparkle: {
    opacity: 0,
  },

  tetromino__i: {
    backgroundColor: "rgba(80, 227, 230, 1)",
  },

  tetromino__j: {
    backgroundColor: "rgba(36, 95, 223, 1)",
  },

  tetromino__l: {
    backgroundColor: "rgba(223, 173, 36, 1)",
  },

  tetromino__o: {
    backgroundColor: "rgba(223, 217, 36, 1)",
  },

  tetromino__s: {
    backgroundColor: "rgba(48, 211, 56, 1)",
  },

  tetromino__t: {
    backgroundColor: "rgba(132, 61, 198, 1)",
  },

  tetromino__z: {
    backgroundColor: "rgba(240, 80, 195, 1)",
  },
});
