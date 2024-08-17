import { View, Button } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter,Href } from 'expo-router';
import { usePathname } from 'expo-router';

type Language = 'en' | 'fr'; // Ensure this matches your Language type

export default function LanguageSwitcher() {
  const { setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);

    // Extract the current path without the language prefix
    const pathSegments = pathname.split('/').slice(2);
    const currentPath = pathSegments.length ? pathSegments.join('/') : '';

    // Ensure the path is valid and matches the expected Href type
    const newPath:Href = `/${newLanguage}/${currentPath}`;

    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <View>
      <Button title="English" onPress={() => handleLanguageChange('en')} />
      <Button title="French" onPress={() => handleLanguageChange('fr')} />
      {/* Add more languages as needed */}
    </View>
  );
}
