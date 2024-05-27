import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Modal, View, StyleSheet, KeyboardAvoidingView, Dimensions, Text, Animated } from "react-native";
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import { WebView } from 'react-native-webview';
import UserContext from "../../utils/contexts/userContext";

const ChatBotButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [showText, setShowText] = useState(false);
  const [glitterAnimation] = useState(new Animated.Value(0));  // For glitter effect
  const {user} = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(prev => !prev);  // Toggle the visibility of the text every 5 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Glitter effect animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glitterAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(glitterAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [glitterAnimation]);

  const handleOpenChat = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const chatUrl = "https://embed.fixie.ai/agents/cf387864-04ee-4450-a37f-699b98621f33";

  const glitterStyle = {
    opacity: glitterAnimation,
    transform: [{
      scale: glitterAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05]
      })
    }]
  };

  return (
    <View style={styles.container}>
      {showText && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Talk with virtual therapist</Text>
        </View>
      )}
      <Animated.View style={[styles.floatingButton, glitterStyle]}>
        <TouchableOpacity onPress={handleOpenChat}>
          <View style={styles.iconContainer}>
            <IoniconsIcon name="chatbox" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showChat}
        onRequestClose={handleCloseChat}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <WebView
            source={{ uri: chatUrl }}
            style={{ flex: 1 }}
            scalesPageToFit={true}
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default ChatBotButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#257DE9',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    borderRadius: 999,
    backgroundColor: 'white',
    padding: 5,
  },
  alertBox: {
    position: 'absolute',
    bottom: 70,  // Adjust based on your layout
    right: 10,  // Adjust so the triangle points to the button
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007700',
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});