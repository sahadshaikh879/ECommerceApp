import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/theme';

const { width } = Dimensions.get('window');

interface ProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const hasMultipleImages = images.length > 1;

  const handleScroll = (direction: 'next' | 'prev') => {
    if (!hasMultipleImages) return;
    
    let nextIndex = activeIndex + (direction === 'next' ? 1 : -1);
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= images.length) nextIndex = images.length - 1;
    
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={{ width: width, height: '100%' }} resizeMode="contain" />
  );

  return (
    <View style={{ height: width * 0.9, position: 'relative', backgroundColor: Colors.surface }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setActiveIndex(Math.round(x / width));
        }}
        renderItem={renderImageItem}
      />
      
      {hasMultipleImages && (
        <View style={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginTop: -16,
        }}>
          <TouchableOpacity 
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            onPress={() => handleScroll('prev')}
          >
            <Image 
              source={require('../../assets/chevron-left.png')} 
              style={{ width: 16, height: 16, tintColor: Colors.black }} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            onPress={() => handleScroll('next')}
          >
            <Image 
              source={require('../../assets/chevron-left.png')} 
              style={[{ width: 16, height: 16, tintColor: Colors.black }, { transform: [{ rotate: '180deg' }] }]} 
            />
          </TouchableOpacity>
        </View>
      )}

      {hasMultipleImages && (
        <View style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 15,
          alignSelf: 'center',
          gap: 8,
        }}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: Colors.inactiveDot,
              }, activeIndex === index && { backgroundColor: Colors.dark }]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductImageCarousel;

