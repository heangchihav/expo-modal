import { View, Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  const content = {
    en: 'About Us',
    fr: 'À propos de nous',
  };

  return (
    <View>
      <Text>{content[language]}</Text>
    </View>
  );
}
