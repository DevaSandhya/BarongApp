import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddNewsScreen from './src/screens/AddNewsScreen';
import EditNewsScreen from './src/screens/EditNewsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ blogData, setBlogData }) => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" options={{ title: 'Home' }}>
      {props => <HomeScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
    </Stack.Screen>
    <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="EditNews">
      {props => <EditNewsScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const AddNewsStack = ({ blogData, setBlogData }) => (
  <Stack.Navigator>
    <Stack.Screen name="AddNewsScreen" options={{ title: 'Add News' }}>
      {props => <AddNewsScreen {...props} blogData={blogData} setBlogData={setBlogData} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const App = () => {
  const [blogData, setBlogData] = useState([
    {
      id: 1,
      category: 'Mengenal Tari Bali',
      title: 'Tari Wali (Tari Sakral)',
      date: 'Sep 2, 2023',
      comments: '99',
      image:
        'https://akcdn.detik.net.id/community/media/visual/2022/11/14/tari-baris-tombak_169.png?w=620',
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontWeight: 'bold' },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Add News') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {props => <HomeStack {...props} blogData={blogData} setBlogData={setBlogData} />}
        </Tab.Screen>
        <Tab.Screen name="Add News">
          {props => <AddNewsStack {...props} blogData={blogData} setBlogData={setBlogData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
