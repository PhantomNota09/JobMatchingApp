import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { fetchJobsFromSerpApi } from '../services/SerpApi'; // Ensure this path is correct

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 50;

export default function HomeScreen() {
  const [cardStack, setCardStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const translateX = useSharedValue(0);
  const panGesture = Gesture.Pan();

  // Fetch jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await fetchJobsFromSerpApi('software developer', 'New York');
        if (jobs.length > 0) {
          setCardStack(jobs.map((job, index) => ({ ...job, id: index })));
        } else {
          console.log('No jobs found');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleSwipe = (direction) => {
    const swipedJob = cardStack[0];
    if (direction === 'right') {
      console.log(`Interested in ${swipedJob.title}`);
    } else {
      console.log(`Not interested in ${swipedJob.title}`);
    }

    // Remove the swiped job from the stack
    setCardStack((prevStack) => {
      const newStack = prevStack.slice(1);
      return [...newStack];
    });

    translateX.value = withSpring(0);
  };

  panGesture.onUpdate((event) => {
    translateX.value = event.translationX;
  }).onEnd(() => {
    if (translateX.value > SWIPE_THRESHOLD) {
      runOnJS(handleSwipe)('right');
      translateX.value = withSpring(width * 2);
    } else if (translateX.value < -SWIPE_THRESHOLD) {
      runOnJS(handleSwipe)('left');
      translateX.value = withSpring(-width * 2);
    } else {
      translateX.value = withSpring(0);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Behind Card */}
        {cardStack.length > 1 && (
          <Animated.View style={[styles.card, styles.behindCard]}>
            <ScrollView
              contentContainerStyle={styles.cardContent}
              showsVerticalScrollIndicator={true} // Show vertical scrollbar
              scrollEnabled={true} // Ensure scrolling is enabled
              onTouchStart={() => console.log('Behind ScrollView touch start')}
              onScroll={() => console.log('Behind ScrollView is scrolling')}
            >
              <Text style={styles.jobTitle}>{cardStack[1].title || 'Title'}</Text>
              <Text style={styles.companyName}>{cardStack[1].companyName || 'Company'}</Text>
              <Text style={styles.jobLocation}>{cardStack[1].location || 'Location'}</Text>
              <Text style={styles.jobDescription}>{cardStack[1].description || 'Description'}</Text>
              {cardStack[1].highlights && cardStack[1].highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightContainer}>
                  <Text style={styles.highlightTitle}>{highlight.title}</Text>
                  {highlight.items.map((item, idx) => (
                    <Text key={idx} style={styles.highlightItem}>{item}</Text>
                  ))}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Top Card */}
        {cardStack.length > 0 && (
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <ScrollView
                contentContainerStyle={styles.cardContent}
                showsVerticalScrollIndicator={true} // Show vertical scrollbar
                scrollEnabled={true} // Ensure scrolling is enabled
                onTouchStart={() => console.log('Top ScrollView touch start')}
                onScroll={() => console.log('Top ScrollView is scrolling')}
              >
                <Text style={styles.jobTitle}>{cardStack[0].title || 'Title'}</Text>
                <Text style={styles.companyName}>{cardStack[0].companyName || 'Company'}</Text>
                <Text style={styles.jobLocation}>{cardStack[0].location || 'Location'}</Text>
                <Text style={styles.jobDescription}>{cardStack[0].description || 'Description'}</Text>
                {cardStack[0].highlights && cardStack[0].highlights.map((highlight, index) => (
                  <View key={index} style={styles.highlightContainer}>
                    <Text style={styles.highlightTitle}>{highlight.title}</Text>
                    {highlight.items.map((item, idx) => (
                      <Text key={idx} style={styles.highlightItem}>{item}</Text>
                    ))}
                  </View>
                ))}
              </ScrollView>
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
    backgroundColor: '#F4F6F9',
    paddingBottom: 100,
  },
  cardContainer: {
    position: 'relative',
    width: width - 30,
    height: height * 0.8,
  },
  card: {
    width: width - 30,
    height: height * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  behindCard: {
    zIndex: 0,
  },
  cardContent: {
    padding: 25,
    alignItems: 'flex-start',
    minHeight: height * 0.75,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 20,
    color: '#555555',
    marginBottom: 8,
  },
  jobLocation: {
    fontSize: 18,
    color: '#777777',
    marginBottom: 12,
  },
  jobDescription: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 20,
  },
  highlightContainer: {
    marginBottom: 20,
    width: '100%',
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  highlightItem: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  arrowButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  arrowText: {
    fontSize: 32,
    color: '#333333',
  },
});
