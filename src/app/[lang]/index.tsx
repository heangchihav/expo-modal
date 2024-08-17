import { View, Text } from 'react-native';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '@/src/components/LanguageSwitcher';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const { language } = useLanguage();

  const content = {
    en: 'Welcome to the Home Page',
    fr: 'Bienvenue sur la page d\'accueil',
  };

  return (
    <SafeAreaView>
      <LanguageSwitcher/>
      <Text>{content[language]}</Text>
    </SafeAreaView>
  );
}
