import { Text, StyleSheet, Alert, View, Dimensions } from "react-native";
import { ThemedView } from "./ThemedView";
const { width, height } = Dimensions.get("window");

export default function GameStats({ gameStats }) {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const ViewnesToLevel = linesPerLevel - linesCompleted;

  return (
      <View style={[styles.GameStats, styles.GameStats__right]}>
        <Text style={[styles.subTitle]}>Nivel</Text>
        <Text style={[styles.value]}>{level}</Text>
        <Text style={[styles.subTitle]}>Linhas por nivel</Text>
        <Text style={[styles.value]}>{ViewnesToLevel}</Text>
        <Text style={[styles.subTitle]}>Pontos</Text>
        <Text style={[styles.value]}>{points || "0"}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  GameStats: {
    position: 'absolute',
    width: width * 0.20,
    color: 'rgba(255, 255, 255, 0.5)', 
  },

  GameStats__left: {
    right: 0,
    top: height * 0.20, 
    textAlign: 'left',
  },

  GameStats__right: {
    right: 0,
    bottom: width * 0.15,
    textAlign: 'left',
  },

  value: {
    fontSize: 12, 
    marginBottom: 8, 
    color: 'rgba(255, 255, 255, 1)',
  },
  subTitle: {
    fontSize: 10,
    marginBottom: 10,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
