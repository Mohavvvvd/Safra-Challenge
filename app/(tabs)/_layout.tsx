import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFEB3B' }, 
          headerTintColor: '#212121', 
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          title: 'Safra Challenge',
          
          headerRight: () => <AboutButton />,
        }}
      />
    </>
  );
}

function AboutButton() {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push('/about')}>
      <Ionicons name="information-circle" size={28} color="#212121" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
});
