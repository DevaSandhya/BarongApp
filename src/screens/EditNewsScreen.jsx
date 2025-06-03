import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditNewsScreen = ({ route, navigation }) => {
  const { blog } = route.params;
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [image, setImage] = useState(blog.image);
  const [content, setContent] = useState(blog.content || '');
  const API_URL = 'https://683eddac1cd60dca33dd6320.mockapi.io/api/blog';

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${blog.id}`, {
        title,
        category,
        image,
        content,
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
