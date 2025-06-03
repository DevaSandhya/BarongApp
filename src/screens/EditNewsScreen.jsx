import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditNewsScreen = ({ route, navigation, blogData, setBlogData }) => {
  const { blog } = route.params;
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [image, setImage] = useState(blog.image);
  const [date, setDate] = useState(blog.date);
  const [comments, setComments] = useState(blog.comments);

  const handleUpdate = () => {
    const updatedNews = { ...blog, title, category, image, date, comments };
    const updatedData = blogData.map(item => item.id === blog.id ? updatedNews : item);
    setBlogData(updatedData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput placeholder="Image URL" style={styles.input} value={image} onChangeText={setImage} />
      <TextInput placeholder="Date" style={styles.input} value={date} onChangeText={setDate} />
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
