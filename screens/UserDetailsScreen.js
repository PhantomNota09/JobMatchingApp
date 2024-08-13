import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UserDetailsScreen = ({ navigation }) => {
  const [education, setEducation] = useState('');
  const [previousJobs, setPreviousJobs] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Education"
        onChangeText={setEducation}
      />
      <TextInput
        style={styles.input}
        placeholder="Previous Jobs"
        onChangeText={setPreviousJobs}
      />
      <Button title="Next" onPress={() => navigation.navigate('JobPreferences')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default UserDetailsScreen;
