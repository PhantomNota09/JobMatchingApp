import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const jobs = [
  { id: 1, title: 'Software Developer', company: 'Tech Corp', description: 'Develop and maintain software applications.' },
  { id: 2, title: 'Mechanical Engineer', company: 'Engineering Ltd.', description: 'Design and test mechanical systems.' },
  { id: 3, title: 'Data Scientist', company: 'Data Solutions', description: 'Analyze and interpret complex data to help organizations make decisions.' },
  { id: 4, title: 'UI/UX Designer', company: 'Creative Agency', description: 'Design intuitive and visually appealing user interfaces and experiences.' },
  { id: 5, title: 'Product Manager', company: 'Product Ventures', description: 'Oversee the development and launch of products from conception to completion.' },
  { id: 6, title: 'Marketing Specialist', company: 'Market Innovators', description: 'Develop and execute marketing strategies to promote products and services.' },
  { id: 7, title: 'Cybersecurity Analyst', company: 'SecureNet', description: 'Protect organizations from cyber threats and ensure data security.' },
  { id: 8, title: 'DevOps Engineer', company: 'Tech Ops', description: 'Automate and streamline development and operations processes to improve efficiency.' },
];

const SWIPE_THRESHOLD = 50;

export default function HomeScreen() {
  const [cardStack, setCardStack] = useState(jobs.map((job, index) => index));
  const translateX = useSharedValue(0);

  const handleSwipe = (direction) => {
    const swipedJob = jobs[cardStack[0]];
    if (direction === 'right') {
      console.log(`Interested in ${swipedJob.title}`);
    } else {
      console.log(`Not interested in ${swipedJob.title}`);
    }
    // Remove the swiped job from the stack and add it to the end
    setCardStack((prevStack) => {
      const newStack = prevStack.slice(1).concat(prevStack[0]);
      return newStack;
    });
    translateX.value = withSpring(0);
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // Swipe right
        runOnJS(handleSwipe)('right');
        translateX.value = withSpring(width * 2);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe left
        runOnJS(handleSwipe)('left');
        translateX.value = withSpring(-width * 2);
      } else {
        // Return to original position
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Behind Card */}
        {cardStack.length > 1 && (
          <Animated.View style={[styles.card, styles.behindCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.jobTitle}>{jobs[cardStack[1]].title}</Text>
              <Text style={styles.companyName}>{jobs[cardStack[1]].company}</Text>
              <Text style={styles.jobDescription}>{jobs[cardStack[1]].description}</Text>
            </View>
          </Animated.View>
        )}

        {/* Top Card */}
        {cardStack.length > 0 && (
          <GestureDetector gesture={swipeGesture}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <View style={styles.cardContent}>
                <Text style={styles.jobTitle}>{jobs[cardStack[0]].title}</Text>
                <Text style={styles.companyName}>{jobs[cardStack[0]].company}</Text>
                <Text style={styles.jobDescription}>{jobs[cardStack[0]].description}</Text>
              </View>
            </Animated.View>
          </GestureDetector>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => handleSwipe('left')}>
          <Text style={styles.arrowText}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowButton} onPress={() => handleSwipe('right')}>
          <Text style={styles.arrowText}>✔️</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    position: 'relative',
    width: width - 40,
    height: height * 0.6,
  },
  card: {
    width: width - 40,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  behindCard: {
    zIndex: 0,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', 
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  arrowButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  arrowText: {
    fontSize: 30,
  },
});
