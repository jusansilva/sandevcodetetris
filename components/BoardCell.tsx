import { StyleSheet, View, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

interface Cell {
  className: string;
}

export default function BoardCell({ cell, board }: { cell: Cell; board: any }) {
  const styles = StyleSheet.create({
    BoardCell: {
      width: 25,
      height: 25,
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
    ghostSparkle: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
       opacity: 0.7,
    },
    tetromino__i: {
      backgroundColor: "#00BFFF",
    },
    tetromino__j: {
      backgroundColor: "#0099FF ",
    },
    tetromino__l: {
      backgroundColor: "#FFAA00",
    },
    tetromino__o: {
      backgroundColor:"rgba(249, 235, 34, 0.83)",
    },
    tetromino__s: {
      backgroundColor: "#00FF99",
    },
    tetromino__t: {
      backgroundColor: "#9900FF",
    },
    tetromino__z: {
      backgroundColor: "#FF0080",
    },
  });

  return (
    <View
      style={[
        styles.tetromino,
        styles.BoardCell,
        styles[cell.className.split(" ")[0] as keyof typeof styles] || {},
        cell.className.split(" ")[1]?.includes('ghost') ? styles.ghostSparkle : {},
      ]}
    >
      <View style={[styles.Sparkle]}></View>
    </View>
  );
}
