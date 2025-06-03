import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

const EditNewsScreen = ({ route, navigation }) => {
  const { blog } = route.params;
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [image, setImage] = useState(blog.image);
  const [content, setContent] = useState(blog.content || '');

  const handleUpdate = async () => {
    try {
      const blogRef = doc(db, 'blogs', blog.id);
      await updateDoc(blogRef, {
        title,
        category,
        content,
        image,
      });
      navigation.goBack();
    } catch (err) {
      console.error('Failed to update news:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput placeholder="Image URL" style={styles.input} value={image} onChangeText={setImage} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} />
      <Button title="Update News" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
});

export default EditNewsScreen;
