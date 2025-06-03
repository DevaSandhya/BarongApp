import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // <-- Import the animation library

const HomeScreen = ({ navigation, blogData }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={blogData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation="fadeInUp" // Animation type
            delay={index * 100}  // Staggered appearance
            duration={600}       // Duration of animation
            useNativeDriver      // Better performance
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { blog: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.date}</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});

export default HomeScreen;
