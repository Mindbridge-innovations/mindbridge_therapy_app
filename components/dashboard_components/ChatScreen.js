import React, { useCallback, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db,rtdb } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { GiftedChat, InputToolbar, Composer } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../utils/contexts/userContext';

const ChatScreen = ({ route }) => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  //get the therapist data object from the therapist details screen
  const {params} = route;
  const otherUser = params ? params.therapist : null;
  


  const signOutNow = () => {
    signOut(auth).then(() => {
      navigation.replace('SignInScreen');
    }).catch((error) => {
      // Handle errors here
    });
  };

  // create a unique chatroom id for each chat between users
  const chatRoomId = [user.userId, otherUser.id].sort().join('_');

  //set a ref for querring chat messages
  const messagesRef = ref(rtdb, `chat-messages/${chatRoomId}`);

  const renderInputToolbar = (props) => {
    // Add custom styling or additional components
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  };
  
  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={styles.composer}
      />
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <View style={{ marginLeft: 20 }}>
              <Avatar
                  rounded
                  source={{
                      uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1371797889%2Fvector%2Fyoung-smiling-man-avatar-3d-vector-people-character-illustration-cartoon-minimal-style-3d.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DWykJb6hyEUv8T9k86g-LG9u980sEwqK8FG1m1tXgnSI%3D&tbnid=wPEwKq6uj7rQzM&vet=12ahUKEwjT3aHnnvuEAxUFsScCHUsmBOYQMygAegQIARBR..i&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2F3d-avatar-character&docid=Cgbh-EBhGH2y4M&w=612&h=556&q=avatar&hl=en&ved=2ahUKEwjT3aHnnvuEAxUFsScCHUsmBOYQMygAegQIARBR'
                  }}
              />
          </View>
      ),
      headerRight: () => (
          <TouchableOpacity style={{
              marginRight: 10
          }}
              onPress={signOutNow}
          >
              <Text>logout</Text>
          </TouchableOpacity>
      ),
      headerTitle: () => <Text style={styles.headerTitle}>Chat with {otherUser.name}</Text>,
      headerStyle: {
      backgroundColor: '#077AB0', // Set your desired color
      },
  },[navigation, otherUser]);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const loadedMessages = [];
      snapshot.forEach((childSnapshot) => {
        const messageData = childSnapshot.val();
        loadedMessages.push({
          _id: childSnapshot.key,
          text: messageData.text,
          createdAt: new Date(messageData.createdAt),
          user: messageData.user,
        });
      });
      setMessages(loadedMessages.reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    const { text } = messages[0];
    push(messagesRef, {
      text,
      user: {
        _id: user.userId,
        name: user.username,
        // avatar: user.photoURL,
      },
      conversation_id:chatRoomId,
      createdAt: serverTimestamp(),
    });
  }, [user]);

  return (
    <GiftedChat
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.userId,
        name: user.username,
        // avatar: currentUser.photoURL,
      }}
    />
  );
};

export default ChatScreen;



const styles = StyleSheet.create({
    // ... other styles
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      // Add other styling as needed
    },
     // ... other styles
    inputToolbar: {
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        backgroundColor: '#f5f5f5',
        // Add other styling as needed
    },
    composer: {
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 5,
        paddingHorizontal: 10,
        color:'black'
        // Add other styling as needed
    },
  });