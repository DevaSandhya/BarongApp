import React, { useState, useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc, getDoc } from 'firebase/firestore';

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

const DetailScreen = ({ route, navigation }) => {
  const { blog } = route.params;
  const [blogDetail, setBlogDetail] = useState(blog);

  const fetchBlogDetail = async () => {
    try {
      const blogRef = doc(db, 'blogs', blog.id);
      const docSnap = await getDoc(blogRef);
      if (docSnap.exists()) {
        setBlogDetail({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (err) {
      console.error('Failed to fetch blog detail:', err);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Delete Blog', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const blogRef = doc(db, 'blogs', blog.id);
            await deleteDoc(blogRef);
            navigation.navigate('HomeScreen');
          } catch (err) {
            console.error('Failed to delete blog:', err);
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBlogDetail();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: blogDetail.image }} style={styles.image} />
      <Text style={styles.title}>{blogDetail.title}</Text>
      <Text>{blogDetail.category}</Text>
      <Text>{blogDetail.date}</Text>
      <Text>{blogDetail.comments} comments</Text>

      <Button title="Edit News" onPress={() => navigation.navigate('EditNews', { blog: blogDetail })} />
      <View style={{ height: 10 }} />
      <Button title="Delete News" color="red" onPress={handleDelete} />
      <View style={{ height: 10 }} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default DetailScreen;
