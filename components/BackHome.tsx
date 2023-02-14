import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../components/Themed';

export default function BackHome({ onPress }: { onPress: any }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.link}>
      <Text style={styles.linkText}>Go to back home!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
});
