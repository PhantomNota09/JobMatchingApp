import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const jobPositions = [
  'Software Developer',
  'Mechanical Engineer',
  'Data Scientist',
  'Product Manager',
  'Marketing Specialist',
  // Add more job positions here
];

const JobPreferencesScreen = ({ navigation }) => {
  const [selectedPositions, setSelectedPositions] = useState([]);

  const toggleSelection = (position) => {
    setSelectedPositions((prevSelected) =>
      prevSelected.includes(position)
        ? prevSelected.filter((pos) => pos !== position)
        : [...prevSelected, position]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Preferences</Text>
      <FlatList
        data={jobPositions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.jobItem,
              selectedPositions.includes(item) && styles.selectedJobItem,
            ]}
            onPress={() => toggleSelection(item)}
          >
            <Text style={styles.jobText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Finish" onPress={() => navigation.navigate('Home')} />
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
  jobItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  selectedJobItem: {
    backgroundColor: '#d3f9d8',
  },
  jobText: {
    fontSize: 16,
  },
});

export default JobPreferencesScreen;
