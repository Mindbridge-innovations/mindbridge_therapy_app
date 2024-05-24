import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import { StyleSheet,Text,View ,Animated} from "react-native";

const ChatBotButton=()=>{
    const [showPopup, setShowPopup] = useState(false);
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    const interval = setInterval(() => {
      // Show the popup
      setShowPopup(true);
      // Start the fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // After 5 seconds, start the fade-out animation
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Hide the popup after the fade-out animation is complete
          setShowPopup(false);
        });
      }, 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

    return(
        <View style={styles.container}>
        {showPopup && (
          <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
            <Text style={styles.popupText}>Chat with mind.ai</Text>
          </Animated.View>
        )}
        <TouchableOpacity style={styles.floatingButton}>
          <View style={styles.iconContainer}>
            <IoniconsIcon name="chatbox" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    )

  
}
export default ChatBotButton;

const styles = StyleSheet.create({
    container: {
        position: 'relative', // Container for positioning children
      },
      floatingButton: {
        position: 'absolute',
        bottom: 0,
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
      popup: {
        position: 'absolute',
        right: '100%', // Position to the left of the button
        marginRight: 10, // Spacing between popup and button
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      popupText: {
        color: '#000',
        fontSize: 14,
      },
  });
