import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Player = {
  id: string;
  name: string;
};

const MAX_PLAYERS = 8;

const TeamScreen: React.FC = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');

  // Add player with max limit check
  const addPlayer = () => {
    const trimmedName = playerName.trim();
    if (trimmedName === '') return;

    if (players.length >= MAX_PLAYERS) {
      Alert.alert(
        'Limit reached',
        `Maximum of ${MAX_PLAYERS} players allowed.`,
        [{ text: 'OK' }],
        { cancelable: true }
      );
      return;
    }

    // Prevent duplicate names
    if (players.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      Alert.alert(
        'Duplicate name',
        'This player name has already been added.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
      return;
    }

    setPlayers((prev) => [...prev, { id: Date.now().toString(), name: trimmedName }]);
    setPlayerName('');
  };

  // Remove player by id
  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Safra Challenge</Text>
      <Text style={styles.subtitle}>Add up to 8 players to start the game</Text>

      {/* Input + Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter player name"
          placeholderTextColor="#757575"
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
          maxLength={20}
          returnKeyType="done"
          onSubmitEditing={addPlayer}
        />
        <TouchableOpacity
          style={[styles.addButton, players.length >= MAX_PLAYERS && styles.addButtonDisabled]}
          onPress={addPlayer}
          disabled={players.length >= MAX_PLAYERS}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List of players */}
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removePlayer(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No players added yet. Start by typing a name!</Text>
        }
        keyboardShouldPersistTaps="handled"
      />

      {/* Start Game Button */}
      <TouchableOpacity
        style={[styles.startButton, { opacity: players.length === 0 ? 0.5 : 1 }]}
onPress={() => {
  if (players.length > 0) {
    router.push({
      pathname: '/(tabs)/game',
      params: { players: JSON.stringify(players) }, 
    });
  }
}}
        disabled={players.length <= 1}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB3B',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#212121',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  addButton: {
    marginLeft: 14,
    backgroundColor: '#212121',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  addButtonDisabled: {
    backgroundColor: '#6e6e6e',
  },
  addButtonText: {
    color: '#FFEB3B',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  list: {
    flex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  removeText: {
    color: '#E91E63',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 48,
    color: '#616161',
    fontSize: 16,
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#212121',
    paddingVertical: 18,
    borderRadius: 36,
    alignItems: 'center',
    marginBottom: 100,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  startButtonText: {
    color: '#FFEB3B',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    
  },
});

export default TeamScreen;