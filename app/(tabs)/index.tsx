import { Image, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";

export default function HomeScreen() {

  const [textToCopy] = useState('27765176000190');

  const copyToClipboard = () => {
    Clipboard.setString(textToCopy); // Copia o texto para o Clipboard
    Alert.alert('Copiado!', 'O texto foi copiado para a área de transferência.');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#292929", dark: "#292929" }}
      headerImage={
        <Image
          source={require("@/assets/images/sandevcode.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">San Dev Code!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Quem Somos</ThemedText>
        <ThemedText>
          A San Dev Code é uma empresa focada no desenvolvimento de soluções
          digitais, como aplicativos, sistemas e sites, com inovação e
          tecnologia. Ela busca atender as necessidades de clientes com projetos
          personalizados, garantindo eficiência, qualidade e resultados
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O Tetris</ThemedText>
        <ThemedText>
          Tetris é um jogo de quebra-cabeça clássico onde o objetivo é encaixar
          peças de diferentes formatos que caem do topo da tela, formando linhas
          horizontais completas. Quando uma linha é preenchida, ela desaparece,
          e o jogador ganha pontos. O jogo termina quando as peças se acumulam
          até o topo da área de jogo. É um desafio de estratégia e rapidez,
          famoso por sua jogabilidade viciante e simplicidade
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Ajude-nos a contruir mais Games</ThemedText>
        <ThemedText>
         Pix: 
         <TouchableOpacity  onPress={copyToClipboard}>
         <ThemedText style={styles.buttonText}> {textToCopy} </ThemedText>
         </TouchableOpacity>
          
          - CNPJ
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 0
  },
});
