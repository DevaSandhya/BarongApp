import React, { useState, useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const DetailScreen = ({ route, navigation }) => {
  const { blog } = route.params;
  const [blogDetail, setBlogDetail] = useState(blog);

  const API_URL = `https://683eddac1cd60dca33dd6320.mockapi.io/api/blog/${blog.id}`;

  const fetchBlogDetail = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogDetail(res.data);
    } catch (err) {
      console.error('Failed to fetch blog detail:', err);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Blog',
      'Are you sure you want to delete this blog post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(API_URL);
              navigation.navigate('HomeScreen'); // Go back to Home and trigger re-fetch
            } catch (err) {
              console.error('Failed to delete blog:', err);
              Alert.alert('Error', 'Failed to delete the blog.');
            }
          },
        },
      ]
    );
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

      <Button
        title="Edit News"
        onPress={() => navigation.navigate('EditNews', { blog: blogDetail })}
      />
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
