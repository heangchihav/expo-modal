import { View, Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();

  const content = {
    en: 'Contact Us',
    fr: 'Contactez-nous',
  };

  return (
    <View>
      <Text>{content[language]}</Text>
    </View>
  );
}
