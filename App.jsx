import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import {
  Receipt21,
  Clock,
  Message,
  SearchNormal,
} from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

const App = () => {
  const [blogData, setBlogData] = useState([
    {
      category: 'Mengenal Tari Bali',
      title: 'Tari Wali (Tari Sakral)',
      date: 'Sep 2, 2023',
      comments: '99',
      image:
        'https://akcdn.detik.net.id/community/media/visual/2022/11/14/tari-baris-tombak_169.png?w=620',
    },
    {
      category: 'Mengenal Tari Bali',
      title: 'Tari Bebali (Tari Upacara)',
      date: 'Sep 2, 2023',
      comments: '67',
      image: 'https://shorturl.at/DDNAH',
    },
    {
      category: 'Mengenal Tari Bali',
      title: 'Tari Balih-balihan (Tari Hiburan)',
      date: 'Sep 2, 2023',
      comments: '83',
      image:
        'https://akcdn.detik.net.id/community/media/visual/2022/10/05/tari-joged-bumbung-2_169.jpeg?w=620',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <Text style={styles.title}>BARONG APP</Text>
        <View style={{ flex: 1 }} />
      </View>

      <View style={searchBarSimple.container}>
        <SearchNormal size={20} color={colors.grey(0.6)} />
        <TextInput
          style={searchBarSimple.input}
          placeholder="Search..."
          placeholderTextColor={colors.grey(0.6)}
        />
      </View>

      <ListBlog blogs={blogData} />
    </View>
  );
};

const ListBlog = ({ blogs }) => {
  const horizontalData = [
    {
      uri: 'https://cdn1.katadata.co.id/media/images/thumb/2020/03/14/2020_03_14-17_42_03_a961e8618b886d62c48aaad80a70c262_960x640_thumb.jpg',
      title: 'Mengenal Tari Bali',
    },
    {
      uri: 'https://i.pinimg.com/736x/b5/49/de/b549de91d4d719cba37daa4e80736f65.jpg',
      title: 'Mengenal Alat Musik Bali',
    },
    {
      uri: 'https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/155/2025/04/12/Tari-Topeng-Tua-1610501928.jpg',
      title: 'Mengenal Topeng Bali',
    },
  ];

  return (
    <ScrollView style={styles.listBlog}>
      {/* Horizontal Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 15 }}
      >
        {horizontalData.map((item, index) => (
          <View
            key={index}
            style={{
              ...itemHorizontal.cardItem,
              ...(index === 0 && { marginLeft: 24 }),
              ...(index === horizontalData.length - 1 && { marginRight: 24 }),
            }}
          >
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: item.uri }}
            >
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      {/* Vertical Blog List */}
      {blogs.map((item, index) => (
        <View key={index} style={itemVertical.listCard}>
          <View style={itemVertical.cardItem}>
            <Image style={itemVertical.cardImage} source={{ uri: item.image }} />
            <View style={itemVertical.cardContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ gap: 5, width: '70%' }}>
                  <Text style={itemVertical.cardCategory}>{item.category}</Text>
                  <Text style={itemVertical.cardTitle}>{item.title}</Text>
                </View>
                <Receipt21 color={colors.grey(0.6)} variant="Linear" size={20} />
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
                <Text style={itemVertical.cardText}>{item.date}</Text>
                <Message size={10} variant="Linear" color={colors.grey(0.6)} />
                <Text style={itemVertical.cardText}>{item.comments}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    height: 60,
    elevation: 5,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.white(),
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.redOrange(),
    textShadowColor: 'rgba(255, 100, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
});

const searchBarSimple = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: colors.grey(0.15),
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});

const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  cardInfo: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  cardText: {
    fontSize: 12,
    color: colors.white(),
    fontFamily: fontType['Pjs-Regular'],
  },
});

const itemVertical = StyleSheet.create({
  listCard: {
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  cardItem: {
    gap: 12,
  },
  cardImage: {
    height: 180,
    width: '100%',
    borderRadius: 15,
  },
  cardContent: {
    gap: 10,
  },
  cardCategory: {
    fontFamily: fontType['Pjs-Medium'],
    color: colors.redOrange(),
    fontSize: 12,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 10,
    color: colors.grey(0.6),
  },
});

export default App;
