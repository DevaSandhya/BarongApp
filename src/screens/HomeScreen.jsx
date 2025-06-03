import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const API_URL = 'https://683eddac1cd60dca33dd6320.mockapi.io/api/blog';

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBlogs();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 100} duration={600} useNativeDriver>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { blog: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.category}</Text>
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
