import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEzBiIgnvv4gZwFHt-AelYl-NhdSj54uc",
  authDomain: "barongapp-5619b.firebaseapp.com",
  projectId: "barongapp-5619b",
  storageBucket: "barongapp-5619b.firebasestorage.app",
  messagingSenderId: "350220019947",
  appId: "1:350220019947:android:14fd68ee663ef3b002b6ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const HomeScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogList = [];
      querySnapshot.forEach(doc => {
        blogList.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogList);
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
