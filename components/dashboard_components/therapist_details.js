import React, { useContext, useEffect, useState } from 'react';
import {View, Image, Text, Dimensions, StyleSheet,Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/utils/custom_button';
import {useNavigation} from '@react-navigation/native';
import RateTherapistScreen from './ratingForm';
import ChatBotButton from '../../assets/utils/chatbotButton';
import reverseMappings from '../responseReverseMapping';

const TherapistDetailsScreen = ({route}) => {
  //getting the details of the therapist and saving to a user object
  const {passedUser} = route.params;
  const navigation = useNavigation();

  const [isRatingModalVisible, setRatingModalVisible] = useState(false);

  const handleOpenRatingModal = () => {
    setRatingModalVisible(true);
  };

  const handleCloseRatingModal = () => {
    setRatingModalVisible(false);
  };

  const handleRatingSubmit = (therapistId, rating) => {
    // TODO: Implement the submission logic
    console.log(`Rating for therapist ${therapistId}: ${rating}`);
    handleCloseRatingModal();
  };

  const [imageHeight, setImageHeight] = useState(300); // Default height

  useEffect(() => {
    if (passedUser.profileImage) {
      Image.getSize(passedUser.profileImage, (width, height) => {
        // Calculate the height based on the aspect ratio
        const screenWidth = Dimensions.get('window').width * 0.9;
        const scaleFactor = width / screenWidth;
        const calculatedHeight = height / scaleFactor;
        setImageHeight(calculatedHeight);
      }, error => {
        console.error(`Unable to retrieve image size: ${error.message}`);
      });
    }
  }, [passedUser.profileImage]);
  
  return (
    <View style={{flex:1}}>
    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
      <View style={{backgroundColor: '#255ECC', width: '100%', height: 44}}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 30,
            marginTop: 10,
          }}>
          Dr. {passedUser.lastName} {passedUser.firstName}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', width: '90%'}}>
        {/* displaying the therapist profile image */}
        <Image
          source={passedUser.profileImage ? { uri: passedUser.profileImage } : require('../../assets/images/doctor_avatar.jpeg')}
          style={[styles.avatar, { height: imageHeight }]}
          />
        {/* small text displays of the number of patients, experience and rating */}
        <View style={styles.infoRow}>
         
            {/* display the number of years of experience of a therapist */}
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Experience</Text>
            <Text style={styles.infoValue}>{passedUser.responses.experience_yrs} years</Text>
          </View>

          {/* display the rating value for a therapist */}
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Rating</Text>
            <Text style={styles.infoValue}>{passedUser.averageRating}/ 5</Text>
          </View>
        </View>
        {/* text display about the therapist */}
        <View style={{backgroundColor: 'lightgray', borderRadius: 10}}>
          <View style={{padding: 10}}>
          <View style={styles.responsesContainer}>
    <Text style={styles.responsesHeader}>About Dr. {passedUser.responses.full_name}</Text>
    <Text>{passedUser.responses.about_therapist}</Text>

    {/* Therapeutic Experiences */}
    {passedUser.responses['5'] && (
        <View>
            <Text style={styles.infoTitle}>Therapeutic Experiences:</Text>
            {passedUser.responses['5'].map((item, index) => (
                <Text key={index} style={styles.responseItem}>* {reverseMappings.therapy_experiences[item]}</Text>
            ))}
        </View>
    )}

    {/* Communication Preferences */}
    {passedUser.responses['4'] && (
        <View>
            <Text style={styles.infoTitle}>Communication Preferences:</Text>
            {passedUser.responses['4'].map((item, index) => (
                <Text key={index} style={styles.responseItem}>* {reverseMappings.communication[item]}</Text>
            ))}
        </View>
    )}

    

    {/* Languages */}
    {passedUser.responses['6'] && (
        <View>
            <Text style={styles.infoTitle}>Languages:</Text>
            {passedUser.responses['6'].map((item, index) => (
                <Text key={index} style={styles.responseItem}>* {reverseMappings.languages[item]}</Text>
            ))}
        </View>
    )}
</View>
          </View>

        </View>

        <View>
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <CustomButton
              onPress={() => navigation.navigate('AppointmentBookingScreen',{passedUser})}
              title="Book appointment"
              buttonStyle={mystyles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />

            <CustomButton
              onPress={() => navigation.navigate('Chat', {passedUser})}
              title="Message chat"
              buttonStyle={mystyles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomButton
              onPress={() => navigation.navigate('VideoCallPage',{passedUser})}
              title="Video call"
              buttonStyle={mystyles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />

            <CustomButton
              onPress={()=>navigation.navigate('VoiceCall',{passedUser})}
              title="Voice call"
              buttonStyle={mystyles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />


            
          </View>

          <View style={{flexDirection: 'row'}}>
            
            <CustomButton
              onPress={handleOpenRatingModal}
              title="Rate therapist"
              buttonStyle={mystyles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
          </View>
        </View>
      </View>



      {/* Modal for rating the therapist */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRatingModalVisible}
        onRequestClose={handleCloseRatingModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RateTherapistScreen
              therapistId={passedUser.userId} // Make sure to pass the correct therapist ID
              onRatingSubmit={handleRatingSubmit}
            />
            <CustomButton
              onPress={handleCloseRatingModal}
              title="Close"
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />

          </View>
        </View>
      </Modal>
    </ScrollView>
    <ChatBotButton/>

    </View>

  );
};
export default TherapistDetailsScreen;

const styles = StyleSheet.create({
  avatar: {
    width:Dimensions.get('window').width*0.9,
    height:300,
    borderRadius: 10,
    marginVertical: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#257DE9',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    paddingHorizontal:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  responsesContainer: {
    marginTop: 10,
  },
  responsesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseItem: {
    fontSize: 14,
    color: '#666',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
  responsesContainer: {
    marginTop: 10,
    padding: 10,
},
responsesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
},
infoTitle: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
    fontWeight:'bold'
},
responseItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,  // Indent list items for better readability
},
});
