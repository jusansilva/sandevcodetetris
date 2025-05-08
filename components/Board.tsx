import { Text, StyleSheet, Alert, Dimensions, View } from "react-native";
import BoardCell from "@/components/BoardCell";
const { width, height } = Dimensions.get("window");

interface BoardProps {
  board: {
    size: {
      row: number;
      columns: number;
    };
    rows: number[][];
  };
}

export default function Board({ board }: BoardProps) {
  const styles = StyleSheet.create({
    Board: {
      marginVertical: 32,
      alignSelf: "center", 
      display: "flex", 
      flexDirection: "row", 
      flexWrap: "wrap", 
      gap: 2, 
      width: width * 0.8, 
      height: height * 0.8, 
      backgroundColor: "rgb(32, 0, 64)",
      borderWidth: 10,
      borderColor: "rgb(32, 0, 64)",
      borderRadius: 10,
      shadowColor: "rgba(0, 0, 0, 0.35)",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 5,
    },
  });

  

  return (
    <View style={[styles.Board]}>
      {board.rows.map((row: any, y: any) =>
        row.map((cell: number, x: number) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </View>
  );
}


