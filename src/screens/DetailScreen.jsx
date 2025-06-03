import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { blog } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: blog.image }} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text>{blog.category}</Text>
      <Text>{blog.date}</Text>
      <Text>{blog.comments} comments</Text>
      <Button
        title="Edit News"
        onPress={() => navigation.navigate('EditNews', { blog })}
      />
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
