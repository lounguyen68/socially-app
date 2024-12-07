import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { Attachment } from '../api/getMessages.api';
import { colors } from '../constants';

export interface MessageImagesProps {
  attachments: Attachment[];
  isYourMessage: boolean;
}

const { width } = Dimensions.get('window');

const MessageImage = ({
  image,
  style = {},
}: {
  image: Attachment;
  style?: ViewStyle;
}) => {
  const [loading, setLoading] = useState(false);

  const imageStyles = {
    ...styles.image,
    ...style,
  };

  return (
    <View style={imageStyles}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      )}
      <Image
        source={{ uri: image.path }}
        style={{
          width: '100%',
          height: '100%',
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};
export default function MessageImages({
  attachments,
  isYourMessage,
}: MessageImagesProps) {
  return (
    <View
      style={[
        styles.container,
        isYourMessage ? styles.userMessage : styles.receivedMessage,
      ]}
    >
      {attachments.length === 1 ? (
        <MessageImage
          image={attachments[0]}
          style={{
            width: IMAGE_SIZE,
            height:
              (IMAGE_SIZE * attachments[0].metadata.height) /
              attachments[0].metadata.width,
          }}
        />
      ) : (
        <FlatList
          style={{
            alignItems: isYourMessage ? 'flex-end' : 'flex-start',
          }}
          data={attachments}
          numColumns={2}
          renderItem={({ item }) => <MessageImage image={item} />}
          keyExtractor={(item, index) => `${item.path}-${index}`}
        />
      )}
    </View>
  );
}

const IMAGE_SIZE = width * 0.7;
const IMAGE_SIZE_IN_LIST = IMAGE_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  image: {
    width: IMAGE_SIZE_IN_LIST,
    height: IMAGE_SIZE_IN_LIST,
    borderRadius: 8,
    marginRight: 2,
    marginBottom: 2,
    overflow: 'hidden',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrayColor,
    borderRadius: 8,
  },
});
