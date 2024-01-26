import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Dimensions, Text } from 'react-native';
import CustomButton from '../assets/widgets/custom_button';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import mystyles from '../assets/stylesheet';


const OnBoardQtnsScreen = ({route}) => {
  const { params } = route;
  const role = params ? params.role : null;

    //logic to capture selected value for select input fields
  const [selectedValue, setSelectedValue] = useState(''); // Set the initial selected value

  const [currentStep, setCurrentStep] = useState(1);
  const numbersArray = Array.from({ length: 86 }, (_, index) => index + 15);

  const [formData, setFormData] = useState({
    therapy_cause: '',
    expectation: '',
    full_name:'',
  });

  const handleNext = () => {
    // You can perform validation here if needed
    // Move to the next step and update the form data
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    // Move to the previous step
    setCurrentStep(currentStep - 1);
  };

  const handleDone = () => {
    // You can perform validation here if needed
    console.log('Form completed:', formData);
    // Perform any final actions, like submitting the form
  };
  

  const renderFormSection = () => {
    switch (currentStep) {
      //first screen of the questions
      case 1:
        return (
          <View style={{ alignItems:'center' }}>
            <View style={styles.inputcontainer}>
              <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>Select your gender identity</Text>
              <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)}>
                  <Picker.Item label="Choose your gender" value="" />
                  <Picker.Item label="Woman" value="woman" />
                  <Picker.Item label="Man" value="man" />
                </Picker>
              </View>

            </View>

            <View style={styles.inputcontainer}>
              <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>How old are you?</Text>
              <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)}>
                  <Picker.Item label="Select your age" value="" />
                  {numbersArray.map((number) => (
                    <Picker.Item key={number.toString()} label={number.toString()} value={number.toString()} />
                  ))}
                </Picker>
              </View>

            </View>

            <View style={ styles.inputcontainer}>
              <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>What is your religion?</Text>
              <View style={styles.picker}>
              <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)}>
                <Picker.Item label="Choose your religion" value="" />
                <Picker.Item label="Christianity" value="christian" />
                <Picker.Item label="Islam" value="islam" />
              </Picker>
              </View>

            </View>

            {role==='Patient' && <View style={ styles.inputcontainer}>
              <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>What is your relationship status?</Text>
              <View style={styles.picker}>
              <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
                <Picker.Item label="Choose your role" value="" />
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Married" value="married" />
              </Picker>
              </View>
            </View>}
            

           
             <View style={styles.buttoncontainer}>
                <CustomButton
                    onPress={handleNext}
                    title="Next"
                    buttonStyle={ styles.buttonStyle}
                    textStyle={{ color: 'white' }}
                />

            </View>        
        </View>
        );

        //return second screen of the questions
      case 2:
        return (
          <View style={{ alignItems:'center' }}>
            {role==='Patient' && <View style={styles.inputcontainer}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>What made you consider therapy today?</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.therapy_cause}
                    onChangeText={(text) => setFormData({ ...formData, therapy_cause: text })} 
                />
            </View>}

              {role==='Patient' && <View style={styles.inputcontainer}>
                <Text style={mystyles.label}>What are your expectations from the therapist doctor?</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.expectation}
                    onChangeText={(text) => setFormData({ ...formData, expectation: text })}
                />
              </View>}

              {role==='Patient' && <View style={styles.inputcontainer}>
              <View style={{ alignItems:'center' }}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>How would you rate your current financial status?</Text>
                <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
                  <Picker.Item label="Choose your status" value="" />
                  <Picker.Item label="Good" value="good" />
                  <Picker.Item label="Fair" value="fair" />
                  <Picker.Item label="Poor" value="poor" />
                </Picker>
                </View>
              </View>
              </View>}

              {role==='Therapist' && <View style={styles.inputcontainer}>
                <Text style={mystyles.label}>Please provide us with your full name</Text>
                <TextInput
                    style={mystyles.input}
                    value={formData.expectation}
                    onChangeText={(text) => setFormData({ ...formData, full_name: text })}
                />
              </View>}

              {role==='Therapist' && <View style={styles.inputcontainer}>
              <View style={{ alignItems:'center' }}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>Which communication mechanisms do you prefer?</Text>
                <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
                  <Picker.Item label="Choose all possible" value="" />
                  <Picker.Item label="Video call" value="Vide call" />
                  <Picker.Item label="Voice call" value="Voice call" />
                  <Picker.Item label="Messaging" value="Messaging" />
                </Picker>
                </View>
              </View>
              </View>}
              


            <View style={styles.buttoncontainer}>
                <CustomButton
                    onPress={handlePrev}
                    title="Previous"
                    buttonStyle={ styles.buttonStyle}
                    textStyle={{ color: 'white' }}
                />
                <CustomButton
                    onPress={handleNext}
                    title="Next"
                    buttonStyle={ styles.buttonStyle }
                    textStyle={{ color: 'white' }}
                />
                

            </View>
          </View>
        );
      case 3:
        return (
          <View style={{ alignItems:'center' }}>
             <View style={ styles.inputcontainer}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>
                  {role === 'Patient' ? 'What experience do you prefer from your therapist?' : 'What professional therapeautic experiences do you posses'}
                </Text>
                <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
                  <Picker.Item label="Choose your preference" value="" />
                  <Picker.Item label="Marriage and Family Therapy" value="Marriage and Family Therapy" />
                  <Picker.Item label="Substance Abuse Counseling" value="Substance Abuse Counseling" />
                  <Picker.Item label="Trauma and PTSD Treatment" value="Trauma and PTSD Treatment" />
                  <Picker.Item label="Anxiety or Depression Counseling" value="Anxiety or Depression Counseling" />
                  <Picker.Item label="Child and Adolescent Therapy" value="Child and Adolescent Therapy" />
                  <Picker.Item label="LGBTQ+ Counseling" value="LGBTQ+ Counseling" />
                  <Picker.Item label="Career Counseling" value="Career Counseling" />

                </Picker>
                </View>
              </View>

              <View style={ styles.inputcontainer}>
                <Text style={{ marginVertical:20, color:'white', fontWeight:'bold' }}>
                {role === 'Patient' ? 'What is your prefered language? Choose one' : 'What languages can you speak? Choose all possible'}

                </Text>
                <View style={styles.picker}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>setSelectedValue(itemValue)} >
                  <Picker.Item label="Choose your preference" value="" />
                  <Picker.Item label="English" value="english" />
                  <Picker.Item label="Swahili" value="swahili" />
                  <Picker.Item label="Luganda" value="luganda" />
                  <Picker.Item label="Lugbara" value="lugbara" />
                  <Picker.Item label="Luo(Acholi/lango)" value="luo" />
                  <Picker.Item label="Runyankoore" value="luganda" />
                  <Picker.Item label="Ateso" value="ateso" />
                  <Picker.Item label="Alur" value="alur" />
                  <Picker.Item label="Madi" value="madi" />
                  <Picker.Item label="Karamajong" value="Karamajong" />
                  <Picker.Item label="Rukiga" value="rukiga" />
                  <Picker.Item label="Rutooro" value="rutoro" />
                  <Picker.Item label="Lusoga" value="lusoga" />  
                </Picker>
                </View>
              </View>
            <View style={styles.buttoncontainer}>
                <CustomButton
                    onPress={handlePrev}
                    title="Previous"
                    buttonStyle={styles.buttonStyle }
                    textStyle={{ color: 'white' }}
                />
                <CustomButton
                    onPress={handleDone}
                    title="Submit"
                    buttonStyle={ styles.buttonStyle }
                    textStyle={{ color: 'white' }}
                />

            </View>

          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={mystyles.containerview}>
    <View style={{ alignItems:'center', marginHorizontal:20 }}>
        <Image
            source={require('./../assets/mindbridgelogo_splash.png')}
            style={mystyles.logoimage}
        />
        <Text style={{ color:'white',fontSize:16 , fontWeight:'bold'}}>
        {role === 'Patient' ? 'Help us pick a relationship therapist for you. This eases matching you with a therapist!' : 'Help us match you easily to patients'}

        </Text>
        
      {renderFormSection()}

      <View style={styles.bottomView}>
        <Text style={{ color:'white', fontWeight:'bold' }}>If you’re in a life-threatening situation, don’t use this app. 
                   Call 988 or usethese resources.</Text>

      </View>
    </View>
    </ScrollView>
  );
};

export default OnBoardQtnsScreen;


const styles=StyleSheet.create({
    
    buttonStyle:{
        backgroundColor: 'black',
        width:Dimensions.get('window').width*0.4,  
        height:50,
        margin:10
        

    },
    buttoncontainer:{
        marginHorizontal:20, 
        alignItems:'center',
        flexDirection:'row',
        marginVertical:30
    },
    picker:{
      backgroundColor:'#FFFFFF',
      width:Dimensions.get('window').width*0.8,
      borderRadius:10,
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10
    },
    inputcontainer:{
      marginTop: 20,
      marginBottom:5
    },
    bottomView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical:5,
      alignItems: 'center',
      marginHorizontal:20,
    },
    

});