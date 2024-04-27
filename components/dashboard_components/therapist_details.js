import React, { useState } from 'react';
import {View, Image, Text, Dimensions, StyleSheet,Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/widgets/custom_button';
import {useNavigation} from '@react-navigation/native';
import RateTherapistScreen from './ratingForm';
import ChatBotButton from '../../assets/widgets/chatbotButton';

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
          Dr. {passedUser.lastName}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', width: '90%'}}>
        {/* displaying the therapist profile image */}
        <Image
          source={require('../../assets/images/doctor_avatar.jpeg')}
          style={styles.avatar}
        />
        {/* small text displays of the number of patients, experience and rating */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Patients</Text>
            <Text style={styles.infoValue}>44</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Experience</Text>
            <Text style={styles.infoValue}>6 yrs</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Rating</Text>
            <Text style={styles.infoValue}>4.1 / 5</Text>
          </View>
        </View>
        {/* text display about the therapist */}
        <View style={{backgroundColor: 'lightgray', borderRadius: 10}}>
          <View style={{padding: 10}}>
            <Text style={{fontWeight: 'bold'}}>
              Speciality: {passedUser.specialty}
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 18, marginVertical: 20}}>
              About me
            </Text>
            <Text style={{fontSize: 16}}>{passedUser.about}</Text>
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
    width: '100%',
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
  infoTitle: {
    fontSize: 14,
    color: 'grey',
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
});
