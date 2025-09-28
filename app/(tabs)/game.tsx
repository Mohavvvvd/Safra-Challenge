import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import questions from '../../assets/questions.json';


const { width, height } = Dimensions.get('window');

type Player = { id: string; name: string };

const TRUTHS = questions.filter(q => q.type === 'Truth');
const DARES = questions.filter(q => q.type === 'Dare');


// ===== ConfettiPiece =====
const ConfettiPiece: React.FC<{ x: number; y: number; size: number; color: string; rotate: string }> = ({ x, y, size, color, rotate }) => (
  <Animated.View
    style={{
      position: 'absolute',
      top: y,
      left: x,
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size * 0.2,
      transform: [{ rotate }],
      opacity: 0.8,
    }}
  />
);

const confettiData = [
  { id: 'c1', x: 20, y: 40, size: 8, color: '#F44336', rotate: '15deg' },
  { id: 'c2', x: 60, y: 80, size: 6, color: '#2196F3', rotate: '-10deg' },
  { id: 'c3', x: 140, y: 30, size: 7, color: '#FFEB3B', rotate: '25deg' },
  { id: 'c4', x: 200, y: 100, size: 5, color: '#4CAF50', rotate: '-20deg' },
  { id: 'c5', x: 280, y: 60, size: 9, color: '#E91E63', rotate: '10deg' },
];

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
const players: Player[] = React.useMemo(
  () => (params.players ? JSON.parse(params.players as string) : []),
  [params.players]
);
const [selectedAction, setSelectedAction] = useState<'Truth' | 'Dare' | null>(null);
const [currentText, setCurrentText] = useState('');


const getRandomPlayer = (excludeId?: string): Player => {
  if (players.length === 1) return players[0];
  let filtered = players;
  if (excludeId) {
    filtered = players.filter(p => p.id !== excludeId);
  }
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled[0];
};


const ActionDisplay: React.FC<{
  selectedAction: 'Truth' | 'Dare';
  currentText: string;
  nextTurn: () => void;
}> = ({ selectedAction, currentText, nextTurn }) => (
  <>
    <Text style={styles.actionType}>{String(selectedAction)}</Text>
    <Text style={styles.actionText}>{String(currentText)}</Text>
    <TouchableOpacity style={styles.nextButton} onPress={nextTurn}>
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  </>
);

// Extracted component for picking an action
const ActionPicker: React.FC<{
  pickAction: (type: 'Truth' | 'Dare') => void;
}> = ({ pickAction }) => (
  <>
    <Text style={styles.title}>Pick : Truth ou Dare ?</Text>
    <View style={styles.choiceContainer}>
      <TouchableOpacity
        style={[styles.choiceButton, { backgroundColor: '#4FC3F7' }]}
        onPress={() => pickAction('Truth')}
      >
        <Text style={styles.choiceText}>Truth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.choiceButton, { backgroundColor: '#FF7043' }]}
        onPress={() => pickAction('Dare')}
      >
        <Text style={styles.choiceText}>Dare</Text>
      </TouchableOpacity>
    </View>
  </>
);

const [currentPlayer, setCurrentPlayer] = useState<Player>(() => getRandomPlayer());

if (!players.length) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No player found!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/team')}>
        <Text style={styles.buttonText}>Back to team</Text>
      </TouchableOpacity>
    </View>
  );
}

const pickAction = (type: 'Truth' | 'Dare') => {
  setSelectedAction(type);
  if (type === 'Truth') {
    if (TRUTHS.length > 0) {
      setCurrentText(String(TRUTHS[Math.floor(Math.random() * TRUTHS.length)]?.text ?? 'No truth questions available.'));
    } else {
      setCurrentText('No truth questions available.');
    }
  } else {
    if (DARES.length > 0) {
      setCurrentText(DARES[Math.floor(Math.random() * DARES.length)].text);
    } else {
      setCurrentText('No dare questions available.');
    }
  }
};

const nextTurn = () => {
  setSelectedAction(null);
  setCurrentText('');
  setCurrentPlayer(getRandomPlayer(currentPlayer.id));
};
  return (
    <View style={styles.container}>
      {/* Confetti */}
      {confettiData.map((c, i) => <ConfettiPiece key={i} {...c} />)}

      <Text style={styles.player}>Player : {String(currentPlayer.name)}</Text>

      {selectedAction ? (
        <ActionDisplay
          selectedAction={selectedAction}
          currentText={currentText}
          nextTurn={nextTurn}
        />
      ) : (
        <ActionPicker pickAction={pickAction} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEB3B', alignItems: 'center', justifyContent: 'center', padding: 20 },
  player: { fontSize: 32, fontWeight: '800', marginBottom: 30, color: '#212121', textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#212121', textAlign: 'center' },
  actionType: { fontSize: 28, fontWeight: '700', marginBottom: 10, color: '#0288D1', textAlign: 'center' },
  actionText: { fontSize: 22, fontWeight: '600', marginBottom: 40, textAlign: 'center', color: '#424242' },
  choiceContainer: { flexDirection: 'row', marginTop: 20 },
  choiceButton: { flex: 1, paddingVertical: 20, marginHorizontal: 10, borderRadius: 50, alignItems: 'center', elevation: 5 },
  choiceText: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  nextButton: { backgroundColor: '#212121', paddingVertical: 16, paddingHorizontal: 50, borderRadius: 50, elevation: 5 },
  nextButtonText: { color: '#FFEB3B', fontSize: 20, fontWeight: '800' },
  button: { backgroundColor: '#FFF', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 50, elevation: 5, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#212121', fontSize: 18, fontWeight: '700', textAlign: 'center' },
});
