import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// ===== ConfettiPiece =====
type ConfettiPieceProps = {
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: string;
};

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ x, y, size, color, rotate }) => (
  <View
    style={{
      position: 'absolute',
      top: y,
      left: x,
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size * 0.3,
      transform: [{ rotate }],
      opacity: 0.9,
    }}
  />
);

// ===== Icons =====
const SpeechBubbleIcon: React.FC = () => (
  <Svg width={48} height={48} viewBox="0 0 64 64" fill="none">
    <Path
      d="M12 10h40a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H20l-12 10V16a6 6 0 0 1 6-6z"
      fill="#4FC3F7"
      stroke="#0288D1"
      strokeWidth={2}
    />
    <Circle cx={24} cy={28} r={3} fill="#0288D1" />
    <Circle cx={32} cy={28} r={3} fill="#0288D1" />
    <Circle cx={40} cy={28} r={3} fill="#0288D1" />
  </Svg>
);

const LightningBoltIcon: React.FC = () => (
  <Svg width={48} height={48} viewBox="0 0 64 64" fill="none">
    <Path
      d="M28 4L6 36h18l-4 24 22-32H32l4-24z"
      fill="#FF7043"
      stroke="#D84315"
      strokeWidth={2}
    />
  </Svg>
);

// ===== Abstract shapes inside an Svg =====
type AbstractShapeProps = {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'rect' | 'diamond';
};

const AbstractShape: React.FC<AbstractShapeProps> = ({ x, y, size, color, shape }) => {
  const baseProps = { fill: color };

  switch (shape) {
    case 'circle':
      return <Circle cx={x} cy={y} r={size / 2} {...baseProps} />;
    case 'rect':
      return <Rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx={4} {...baseProps} />;
    case 'diamond':
      return (
        <Path
          d={`M ${x} ${y - size / 2} L ${x + size / 2} ${y} L ${x} ${y + size / 2} L ${x - size / 2} ${y} Z`}
          {...baseProps}
        />
      );
    default:
      return null;
  }
};

// ===== Confetti data =====
type ConfettiPieceWithId = ConfettiPieceProps & { id: string };

const confettiData: ConfettiPieceWithId[] = [
  { id: 'c1', x: 20, y: 40, size: 10, color: '#F44336', rotate: '15deg' },
  { id: 'c2', x: 60, y: 80, size: 8, color: '#2196F3', rotate: '-10deg' },
  { id: 'c3', x: 140, y: 30, size: 9, color: '#FFEB3B', rotate: '25deg' },
  { id: 'c4', x: 200, y: 100, size: 7, color: '#4CAF50', rotate: '-20deg' },
  { id: 'c5', x: 280, y: 60, size: 11, color: '#E91E63', rotate: '10deg' },
];

// ===== SplashScreen =====
const SplashScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top icons */}
      <View style={styles.topIcons}>
        <View style={styles.iconWrapper}><SpeechBubbleIcon /></View>
        <View style={{ width: 20 }} />
        <View style={styles.iconWrapper}><LightningBoltIcon /></View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Safra Challenge</Text>
      <Text style={styles.subtitle}>Truth or Dare for Students</Text>

      {/* Center icons */}
      <View style={styles.centerIcons}>
        <View style={styles.truthCircle}>
          <Text style={styles.truthText}>T</Text>
          <SpeechBubbleIcon />
        </View>
        <View style={{ width: 40 }} />
        <View style={styles.dareCircle}>
          <Text style={styles.dareText}>D</Text>
          <LightningBoltIcon />
        </View>
      </View>

      <Text style={styles.readyText}>Ready to play!</Text>

      {/* Dedication */}
      <Text style={styles.dedicationText}>Dedicated to ESSTHS Computer Science Promotion 2025/26 🎓</Text>

      {/* Footer */}
      <Text style={styles.footerText}>© 2025 Mohamed Ghoul • All rights reserved</Text>

      {/* Abstract shapes */}
      <Svg width={width} height={300} style={{ position: 'absolute', top: 100, left: 0 }} pointerEvents="none">
        <AbstractShape x={50} y={50} size={20} color="rgba(255,255,255,0.3)" shape="circle" />
        <AbstractShape x={120} y={120} size={30} color="rgba(255,255,255,0.15)" shape="diamond" />
        <AbstractShape x={280} y={80} size={25} color="rgba(255,255,255,0.25)" shape="rect" />
        <AbstractShape x={340} y={40} size={15} color="rgba(255,255,255,0.2)" shape="circle" />
        <AbstractShape x={200} y={150} size={18} color="rgba(255,255,255,0.3)" shape="diamond" />
      </Svg>

      {/* Confetti */}
      {confettiData.map(({ id, x, y, size, color, rotate }) => (
        <ConfettiPiece key={id} x={x} y={y} size={size} color={color} rotate={rotate} />
      ))}

      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={() => router.push('/(tabs)/team')}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB3B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topIcons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  iconWrapper: { width: 48, height: 48 },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#212121',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 17,
    color: '#424242',
    marginTop: 6,
    fontWeight: '500',
  },
  centerIcons: { flexDirection: 'row', marginTop: 50, alignItems: 'center' },
  truthCircle: {
    backgroundColor: '#4FC3F7',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0288D1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  truthText: { position: 'absolute', top: 10, left: 12, fontSize: 26, fontWeight: '700', color: '#01579B' },
  dareCircle: {
    backgroundColor: '#FF7043',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D84315',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  dareText: { position: 'absolute', top: 10, left: 12, fontSize: 26, fontWeight: '700', color: '#BF360C' },
  readyText: { marginTop: 40, fontSize: 20, color: '#212121', fontWeight: '600' },
  dedicationText: { marginTop: 12, fontSize: 14, fontWeight: '500', color: '#424242', textAlign: 'center' },
  footerText: { position: 'absolute', bottom: 40, fontSize: 12, color: '#424242', textAlign: 'center' },
  playButton: {
    position: 'absolute',
    bottom: 130,
    backgroundColor: '#212121',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 35,
    elevation: 5,
    width: width * 0.65,
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  playButtonText: { color: '#FFEB3B', fontSize: 20, fontWeight: '800' },
});

export default SplashScreen;
