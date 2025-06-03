import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddNewsScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const API_URL = 'https://683eddac1cd60dca33dd6320.mockapi.io/api/blog';

  const handleAdd = async () => {
    try {
      await axios.post(API_URL, {
        title,
        category,
        content,
        image,
      });
      navigation.goBack();
    } catch (err) {
      console.error('Failed to add news:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput placeholder="Image URL" style={styles.input} value={image} onChangeText={setImage} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} />
      <Button title="Add News" onPress={handleAdd} />
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

export default AddNewsScreen;
