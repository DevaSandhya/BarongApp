import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddNewsScreen = ({ navigation, blogData, setBlogData }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('0');

  const handleAdd = () => {
    const newNews = {
      id: blogData.length + 1,
      title,
      category,
      image,
      date,
      comments,
    };
    setBlogData([newNews, ...blogData]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput placeholder="Image URL" style={styles.input} value={image} onChangeText={setImage} />
      <TextInput placeholder="Date" style={styles.input} value={date} onChangeText={setDate} />
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
