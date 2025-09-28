import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

// Styled Components
const Container = styled(ScrollView)`
  flex: 1;
  background-color: #FFEB3B;
  padding: 20px;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled(Text)`
  font-size: 28px;
  color: #212121;
  font-weight: 800;
  text-align: center;
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  color: #424242;
  text-align: center;
  margin-top: 8px;
`;

const Card = styled(View)`
  background-color: rgba(33, 33, 33, 0.05);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(33, 33, 33, 0.1);
`;

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #212121;
  margin-bottom: 12px;
`;

const SectionText = styled(Text)`
  font-size: 14px;
  color: #424242;
  line-height: 22px;
`;

const SocialLinks = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  gap: 16px;
`;

const IconButton = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(33, 33, 33, 0.05);
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(33, 33, 33, 0.1);
`;
const FlagContainer = styled(View)`
  width: 100%;
  height: 80px;
  margin-vertical: 15px;
  flex-direction: row;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const FlagStripes = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const FlagStripe = styled(View)`
  flex: 1;
  width: 100%;
`;

const FlagTriangle = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-top-width: 40px;
  border-top-color: transparent;
  border-bottom-width: 40px;
  border-bottom-color: transparent;
  border-left-width: 60px;
  border-left-color: #CE1126;
  z-index: 1;
`;


export default function About() {
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <Header>
        <Title>About Safra Challenge</Title>
        <Image source={require('../../assets/images/index.png')} style={{ width: 300, height: 200, marginTop: 12 ,borderRadius:15,shadowOpacity:0.7,shadowColor:'#404005ff'}} />
        <Subtitle>Truth or Dare game for students</Subtitle>
      </Header>

      <Card>
        <SectionTitle>Creator</SectionTitle>
        <SectionText>
          Mohamed Ghoul, Full-Stack JS Developer. Passionate about building fun and interactive student apps.
        </SectionText>
        <SocialLinks>
          <IconButton onPress={() => openLink("https://www.instagram.com/mohavvvvd")}>
            <Ionicons name="logo-instagram" size={24} color="rgba(33,33,33,0.8)" />
          </IconButton>
          <IconButton onPress={() => openLink("https://www.linkedin.com/in/mohamed-ghoul-224982287")}>
            <Entypo name="linkedin" size={24} color="rgba(33,33,33,0.8)" />
          </IconButton>
          <IconButton onPress={() => openLink("https://github.com/mohavvvvd")}>
            <FontAwesome name="github" size={24} color="rgba(33,33,33,0.8)" />
          </IconButton>
          <IconButton onPress={() => openLink("mailto:mohavvvvd.2021@gmail.com")}>
            <MaterialCommunityIcons name="email-outline" size={24} color="rgba(33,33,33,0.8)" />
          </IconButton>
          <IconButton onPress={() => openLink("https://mohavvvvd.netlify.app")}>
            <Entypo name="globe" size={24} color="rgba(33,33,33,0.8)" />
          </IconButton>
        </SocialLinks>
      </Card>

      <Card>
        <SectionTitle>Contact</SectionTitle>
        <SectionText>
          For questions or suggestions, feel free to contact me via email:
        </SectionText>
        <SectionText style={{ marginTop: 8, fontWeight: "600" }}>
          mohavvvvd.2021@gmail.com
        </SectionText>
      </Card>

      <Card>
        <SectionTitle>About This App</SectionTitle>
        <SectionText>
          Safra Challenge is a Truth or Dare game designed for students. Challenge your friends and have fun while getting to know each other better!
        </SectionText>
        <SectionText style={{ marginTop: 12, fontStyle: "italic", color: "#212121" }}>
          Warning: you’ll probably graduate before the question finishes! 🎓
        </SectionText>
      </Card>

      <Card>
            <SectionTitle>Stand With Palestine 🇵🇸</SectionTitle>
            <SectionText>
              As we build apps and games to bring joy to people around the world, we cannot ignore the ongoing genocide in Gaza. 
              Since October 2023, over 35,000 Palestinians have been killed, including more than 14,000 children, by Israeli forces.
            </SectionText>
            
            <FlagContainer>
  <FlagTriangle />
  <FlagStripes>
    <FlagStripe style={{ backgroundColor: '#000000' }} />
    <FlagStripe style={{ backgroundColor: '#FFFFFF' }} />
    <FlagStripe style={{ backgroundColor: '#007A3D' }} />
  </FlagStripes>
</FlagContainer>
            
            <SectionText>
              We stand in solidarity with the Palestinian people in their struggle for freedom, justice, and equality. 
              We call for an immediate ceasefire, an end to the occupation, and the establishment of a free Palestinian state.
            </SectionText>
            
            <SectionText style={{marginTop: 10, fontStyle: 'italic'}}>
              "Injustice anywhere is a threat to justice everywhere." - Martin Luther King Jr.
            </SectionText>
          </Card>
    </Container>
  );
}
