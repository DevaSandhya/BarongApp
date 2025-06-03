import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddNewsScreen from './src/screens/AddNewsScreen';
import EditNewsScreen from './src/screens/EditNewsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [blogData, setBlogData] = useState([
    {
      id: 1,
      category: 'Mengenal Tari Bali',
      title: 'Tari Wali (Tari Sakral)',
      date: 'Sep 2, 2023',
      comments: '99',
      image: 'https://akcdn.detik.net.id/community/media/visual/2022/11/14/tari-baris-tombak_169.png?w=620',
    },
    {
      id: 2,
      category: 'Mengenal Tari Bali',
      title: 'Tari Bebali (Tari Upacara)',
      date: 'Sep 2, 2023',
      comments: '67',
      image: 'https://shorturl.at/DDNAH',
    },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="AddNews">
          {props => <AddNewsScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
        </Stack.Screen>
        <Stack.Screen name="EditNews">
          {props => <EditNewsScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
