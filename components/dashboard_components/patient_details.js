import React, { useState } from 'react';
import {View, Image, Text, Dimensions, StyleSheet, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import mystyles from '../../assets/stylesheet';
import CustomButton from '../../assets/utils/custom_button';
import {useNavigation} from '@react-navigation/native';
import reverseMappings from '../responseReverseMapping';
import FeedbackForm from './feedbackForm';

const PatientDetailsScreen = ({route}) => {
  //getting the details of the therapist and saving to a user object
  const {passedUser} = route.params;
  const navigation = useNavigation();
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalVisible(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalVisible(false);
  };
  return (
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
          Client: {passedUser.username}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', width: '90%'}}>
        
        {/* small text displays of the number of patients, experience and rating */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Gender</Text>
            <Text style={styles.infoValue}>{passedUser.responses?.gender}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Date of birth</Text>
            <Text style={styles.infoValue}>{passedUser.responses.dob}</Text>
          </View>
          
        </View>
       {/* text display about the therapist */}
       <View style={{backgroundColor: 'lightgray', borderRadius: 10, width:Dimensions.get('window').width*0.9}}>
          <View style={{padding: 10}}>
            <View style={styles.responsesContainer}>
              

              {/* Therapeutic Experiences */}
              {passedUser.responses['5'] && (
                  <View>
                      <Text style={styles.infoTitle}>Therapeutic reasons/needs of the client</Text>
                      {passedUser.responses['5'].map((item, index) => (
                          <Text key={index} style={styles.responseItem}>* {reverseMappings.therapy_experiences[item]}</Text>
                      ))}
                  </View>
              )}

              {/* Communication Preferences */}
              {passedUser.responses['4'] && (
                  <View>
                      <Text style={styles.infoTitle}>Communication Preferences of the client</Text>
                      {passedUser.responses['4'].map((item, index) => (
                          <Text key={index} style={styles.responseItem}>* {reverseMappings.communication[item]}</Text>
                      ))}
                  </View>
              )}

    

              {/* Languages */}
              {passedUser.responses['6'] && (
                  <View>
                      <Text style={styles.infoTitle}>Languages preferences of client</Text>
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
              onPress={() => navigation.navigate('Chat', {passedUser})}
              title="Message chat"
              buttonStyle={styles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
            <CustomButton
              onPress={() => navigation.navigate('VideoCallPage',{passedUser})}
              title="Video call"
              buttonStyle={styles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomButton
              onPress={()=>navigation.navigate('VoiceCall',{passedUser})}
              title="Voice call"
              buttonStyle={styles.custombutton}
              textStyle={{color: 'white', fontWeight: 'bold'}}
            />
            <CustomButton
              onPress={()=>navigation.navigate('TokenDisplay',{ passedUser})}
              title="Generate VR token"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />

          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomButton
              onPress={handleOpenFeedbackModal}
              title="Provide Feedback"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />

            <CustomButton
              onPress={()=>navigation.navigate('VRSessionInteractions',{passedUser})}
              title="VR sessions"
              buttonStyle={styles.custombutton}
              textStyle={styles.buttonText}
            />



          </View>

          
        </View>
      </View>

       {/* Feedback Modal */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={isFeedbackModalVisible}
        onRequestClose={handleCloseFeedbackModal}
      >
        <View style={styles.modalContainer}>
          <FeedbackForm patientId={passedUser.userId} />
          <CustomButton
            onPress={handleCloseFeedbackModal}
            title="Close"
            buttonStyle={styles.customButton}
            textStyle={{ color: 'white', fontWeight: 'bold' }}
          />
        </View>
      </Modal>
      
    </ScrollView>
  );
};
export default PatientDetailsScreen;

const styles = StyleSheet.create({
  custombutton: {
    backgroundColor: 'black',
    width: '50%',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78A1BB', // Semi-transparent background
    padding: 20,
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
    color: 'black',
    fontWeight:'bold'

  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
