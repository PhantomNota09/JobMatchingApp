import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const jobs = [
  { id: '1', companyName: 'Google', position: 'Software Developer', description: 'Develop amazing software.' },
  { id: '2', companyName: 'Apple', position: 'Data Scientist', description: 'Analyze data to gain insights.' },
  // Add more job objects here
];

const HomeScreen = () => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  const handleSwipeRight = () => {
    console.log('Swiped right on', jobs[currentJobIndex].position);
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  };

  const handleSwipeLeft = () => {
    console.log('Swiped left on', jobs[currentJobIndex].position);
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobs.length);
  };

  return (
    <View style={styles.container}>
      {jobs.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.companyName}>{jobs[currentJobIndex].companyName}</Text>
          <Text style={styles.position}>{jobs[currentJobIndex].position}</Text>
          <Text style={styles.description}>{jobs[currentJobIndex].description}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleSwipeLeft}>
              <Text style={styles.buttonText}>Swipe Left</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSwipeRight}>
              <Text style={styles.buttonText}>Swipe Right</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  card: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default HomeScreen;
