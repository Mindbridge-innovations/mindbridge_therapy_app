import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import CustomButton from '../assets/utils/custom_button';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import mystyles from '../assets/stylesheet';
import {useNavigation} from '@react-navigation/native';
import { DatePicker,TimePicker} from './dashboard_components/datePicker';
import Checkbox from '../assets/utils/checkBox';
import Config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-notifications';

const OnBoardQtnsScreen = ({route}) => {
  // defining the navigation variable to shift btn screens
  const navigation = useNavigation();

  // defining the route parameter
  const {params} = route;
  const userData = params ? params?.userData : null;
  const { source } = route.params;
  //variable to change loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Determine the API URL based on the source screen
  const apiUrl = source === 'SignUpScreen' ? `${Config.BACKEND_API_URL}/register` : `${Config.BACKEND_API_URL}/user/updateResponses`;


  //logic to capture selected value for select input fields
  const [gender, setSelectedGender] = useState('');
  const [relationshipStatus, setSelectedRelationshipStatus] = useState('');
  const [financialStatus, setSelectedFinancialStatus] = useState('');

  //capture selected languages
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCommunication, setSelectedCommunication] = useState([]);
  const [selectedTherapyType, setSelectedTherapyType] = useState([]);

//logic/state to shift between the question screens 
  const [currentStep, setCurrentStep] = useState(1);
  const [date,setDate]=useState(new Date())

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  const languages = [
    'English', 'Swahili', 'Luganda', 'Lugbara', 'Luo', 'Runyankoore',
    'Ateso', 'Alur', 'Madi', 'Karamajong', 'Rukiga', 'Rutooro', 'Lusoga',
  ];

  //list of communication mechanisms
  const communication = [
    'Video call', 'Message chat', 'Voice call', 
  ];

  //list of theurapeutic experiences
  const therapy_type = [
    'Anxiety Disorder','Depression','Substance Abuse Counseling','Mood(Bipolar) disorders','Disruptive behaviour and dissocial disorders','Marriage and Family Therapy', 'Trauma and PTSD Treatment',
    'Child and Adolescent Therapy', 'LGBTQ+ Counseling', 'Education mindset councelling', 'Career Counseling',
  ];

  //lookup to map the therapy_type array to the therapy experiences qtns
  const therapyTypeLookup = {
    'Anxiety Disorder':'anxietyDisorder',
    'Depression':'depression',
    'Substance Abuse Counseling': 'substanceAbuseCounseling',
    'Mood(Bipolar) disorders':'moodDisorders',
    'Disruptive behaviour and dissocial disorders':'disruptiveBehavior',
    'Marriage and Family Therapy': 'marriageAndFamilyTherapy',
    'Trauma and PTSD Treatment': 'traumAandPTSDTreatment',
    'Child and Adolescent Therapy': 'childAndAdolescentTherapy',
    'LGBTQ+ Counseling': 'LGBTQCounseling',
    'Education mindset councelling': 'educationMindsetCouncelling',
    'Career Counseling': 'careerCounseling',
  };

  const communicationLookup={
    'Video call':'videoCall',
    'Message chat':'messageChat',
    'Voice call':'voiceCall',

  }


  // assign ids to the questions
  const questions = {
    gender: 1,
    relationshipStatus: 2,
    financialStatus: 3,
    communication: 4,
    therapy_experiences:5,
    languages:6
    // ... other questions ...
  };

  //assign ids to the responses
  const responses = {
    gender: {
      woman: 1,
      man: 2,
      anonymous: 3,
    },
    relationshipStatus: {
      single: 1,
      married: 2,
      
    },
    financialStatus: {
      good: 1,
      fair: 2,
      poor: 3,
    },
    languages: {
      English: 1,Swahili: 2,Luganda: 3,Lugbara:4, Luo:5,Runyankoore:6,Ateso:7,Alur:8,Madi:9,Karamajong:10,Rukiga:11,Rutooro:12,Lusoga:13,
      // ... other languages ...
    },
    communication: {
      videoCall: 1,
      messageChat: 2,
      voiceCall: 3,
      // ... other communication mechanisms ...
    },

    therapy_experiences:{
      anxietyDisorder:1,depression:2,substanceAbuseCounseling:3,moodDisorders:4,disruptiveBehavior:5,marriageAndFamilyTherapy:6,substanceAbuseCounseling:7,traumAandPTSDTreatment:8,childAndAdolescentTherapy:9,LGBTQCounseling:10,educationMindsetCouncelling:11, careerCounseling:7,

    }
    // ... other responses ...
  };

  const selectedGenderId = responses.gender[gender];
  const selectedRelationshipStatusId = responses.relationshipStatus[relationshipStatus];
  const selectedFinancialStatusId = responses.financialStatus[financialStatus];
  const selectedLanguageIds = selectedLanguages.map((language) => responses.languages[language]);
  const selectedCommunicationIds = selectedCommunication.map((comm) => responses.communication[communicationLookup[comm]]);

  const selectedTherapyTypeIds = selectedTherapyType.map((type) => responses.therapy_experiences[therapyTypeLookup[type]]);

  // logic to collect entered form field values
  const [formData, setFormData] = useState({
    therapy_cause: '',
    expectation: '',
    fullName: '',
    experience_yrs: '',
    dob:formatDate(date),
    about_therapist:''
  });


  
  //function to handle language selection
  const handleLanguageToggle = (language) => {
    setSelectedLanguages((currentSelectedLanguages) => {
      if (currentSelectedLanguages.includes(language)) {
        // If the language is already selected, remove it from the array
        return currentSelectedLanguages.filter((lang) => lang !== language);
      } else {
        // If the language is not selected, add it to the array
        return [...currentSelectedLanguages, language];
      }
    });
  };

  //function to handle theurapeutic experience selection selection
  const handleTherapyExperienceToggle = (therapy_type) => {
    setSelectedTherapyType((currentSelectedType) => {
      if (currentSelectedType.includes(therapy_type)) {
        // If the language is already selected, remove it from the array
        return currentSelectedType.filter((type) => type !== therapy_type);
      } else {
        // If the language is not selected, add it to the array
        return [...currentSelectedType, therapy_type];
      }
    });
  };

  //function to handle communication type
  const handlecommunicationToggle = (communication) => {
    setSelectedCommunication((currentSelectedCommunication) => {
      if (currentSelectedCommunication.includes(communication)) {
        // If the language is already selected, remove it from the array
        return currentSelectedCommunication.filter((comm) => comm !== communication);
      } else {
        // If the language is not selected, add it to the array
        return [...currentSelectedCommunication, communication];
      }
    });
  };

  

  // logic to move to next question screen
  const handleNext = () => {
    // Move to the next step and update the form data
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    // Move to the previous step
    setCurrentStep(currentStep - 1);
  };

  const responsesPayload = {
    [questions.gender]: responses.gender[gender],
    [questions.relationshipStatus]: responses.relationshipStatus[relationshipStatus],
    [questions.financialStatus]: responses.financialStatus[financialStatus],
    [questions.languages]: selectedLanguages.map((language) => responses.languages[language]),
    [questions.communication]: selectedCommunication.map((comm) => responses.communication[communicationLookup[comm]]),
    [questions.therapy_experiences]: selectedTherapyType.map((type) => responses.therapy_experiences[therapyTypeLookup[type]]),
    // Include other form data that goes as values
    therapy_cause: formData.therapy_cause,
    expectation: formData.expectation,
    fullName: formData.full_name,
    experience_yrs: formData.experience_yrs,
    dob: formatDate(date),
    about_therapist:formData.about_therapist,
    // ... any other fields ...
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);  // Start loading
    const payload = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        responses: responsesPayload
    };

    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('userToken');

    // Set headers conditionally based on the source
    const headers = {
        'Content-Type': 'application/json',
    };

    if (source !== 'SignUpScreen' && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Determine the HTTP method based on the source
    const method = source === 'SignUpScreen' ? 'POST' : 'PUT';

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            // Handle successful registration or update
            Toast.show(source === 'SignUpScreen' ? 'Registration successful, please check your email for confirmation!' : "Your responses were updated successfully!",{
              type: "success",
              placement: "top",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
            setIsLoading(false)
            
            // Perform matching only if the source is not 'SignUpScreen' (indicating an update)
            if (source !== 'SignUpScreen') {
                const matchingResponse = await fetch(`${Config.BACKEND_API_URL}/match`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const matchingResult = await matchingResponse.json();

                if (matchingResponse.ok) {
                    // Handle successful matching
                    Toast.show('You have been matched successfully with a therapist!',{
                      type: "success",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                    setIsLoading(false)
                } else {
                    // Handle matching errors
                    Toast.show(matchingResult.message,{
                      type: "error",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                }
            }

            // Navigate based on the context
            navigation.navigate(source === 'SignUpScreen' ? 'SignInScreen' : 'My therapists');
        } else {
            // Handle errors from registration or update
            Toast.show(result.message,{
              type: "error",
              placement: "top",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
            setIsLoading(false)
        }
    } catch (error) {
        // Handle network errors
        Toast.show('Error'.error.message,{
          type: "error",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
    }finally{
      setIsLoading(false);  // Stop loading regardless of the outcome
    }
};



  const renderFormSection = () => {
    switch (currentStep) {
      //first screen of the questions
      case 1:
        return (
          <View style={{alignItems: 'center'}}>
            <View style={mystyles.inputcontainer}>
              <Text
                style={{
                  marginVertical: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Select your gender identity
              </Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                  }>
                  <Picker.Item label="Choose your gender" value="" />
                  <Picker.Item label="Woman" value="woman" />
                  <Picker.Item label="Man" value="man" />
                  <Picker.Item label="Anonymous" value="anonymous" />
                </Picker>
              </View>
            </View>

            
              <View style={mystyles.inputcontainer}>
              <Text
                style={{
                  marginVertical: 20,
                  marginBottom:-5,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Select your date of birth.
              </Text>
              <DatePicker isBackgroundBlue={false} date={date} onDateChange={setDate} styles={{backgroundColor:'white',marginTop:10}} />
              </View>

            {userData.role === 'client' && (
              <View style={mystyles.inputcontainer}>
                <Text
                  style={{
                    marginVertical: 20,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  What is your relationship status?
                </Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={relationshipStatus}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedRelationshipStatus(itemValue)
                    }>
                    <Picker.Item label="Choose your status" value="" />
                    <Picker.Item label="Single" value="single" />
                    <Picker.Item label="Married" value="married" />

                    
                  </Picker>
                </View>
              </View>
            )}

            <View style={styles.buttoncontainer}>
              <CustomButton
                onPress={handleNext}
                title="Next"
                buttonStyle={styles.buttonStyle}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        );

      //return second screen of the questions
      case 2:
        return (
          <View style={{alignItems: 'center'}}>
            {userData.role === 'client' && (
              <View style={mystyles.inputcontainer}>
                <Text
                  style={{
                    marginVertical: 20,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  What made you consider therapy today?
                </Text>
                <TextInput
                  style={mystyles.input}
                  value={formData.therapy_cause}
                  onChangeText={text =>
                    setFormData({...formData, therapy_cause: text})
                  }
                />
              </View>
            )}

          {userData.role === 'client' && (
              <View style={mystyles.inputcontainer}>
                <Text
                  style={{
                    marginVertical: 20,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  What is/are your expectations from the therapist doctor??
                </Text>
                <TextInput
                  style={mystyles.input}
                  value={formData.expectation}
                  numberOfLines={3}
                  onChangeText={text =>
                    setFormData({...formData, expectation: text})
                  }
                />
              </View>
            )}

           

            {userData.role === 'client' && (
              <View style={mystyles.inputcontainer}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      marginVertical: 20,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    How would you rate your current financial status?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={financialStatus}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedFinancialStatus(itemValue)
                      }>
                      <Picker.Item label="Choose your status" value="" />
                      <Picker.Item label="Good" value="good" />
                      <Picker.Item label="Fair" value="fair" />
                      <Picker.Item label="Poor" value="poor" />
                    </Picker>
                  </View>
                </View>
              </View>
            )}

            {userData.role === 'therapist' && (
              <View style={mystyles.inputcontainer}>
                <Text style={mystyles.label}>
                  Enter full name
                </Text>
                <TextInput
                  style={mystyles.input}
                  value={formData.fullName}
                  onChangeText={text =>
                    setFormData({...formData, fullName: text})
                  }
                />
              </View>
            )}

            {userData.role === 'therapist' && (
              <View style={mystyles.inputcontainer}>
                <Text style={mystyles.label}>
                  Enter number of years of experience
                </Text>
                <TextInput
                  style={mystyles.input}
                  value={formData.experience_yrs}
                  onChangeText={text =>
                    setFormData({...formData, experience_yrs: text})
                  }
                />
              </View>
            )}

            {/* choosing communication type */}
              <View style={mystyles.inputcontainer}>
               
                  <Text
                    style={{
                      marginVertical: 20,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Which communication mechanisms do you prefer? Choose all possible.
                  </Text>
                  {communication.map((comm) => (
                  <Checkbox
                    key={comm}
                    label={comm}
                    value={selectedCommunication.includes(comm)}
                    onCheck={() => handlecommunicationToggle(comm)}
                  />
                ))}
              </View>
            

            <View style={styles.buttoncontainer}>
              <CustomButton
                onPress={handlePrev}
                title="Previous"
                buttonStyle={styles.buttonStyle}
                textStyle={{color: 'white'}}
              />
              <CustomButton
                onPress={handleNext}
                title="Next"
                buttonStyle={styles.buttonStyle}
                textStyle={{color: 'white'}}
              />
            </View>
          </View>
        );

      // return third screen of the questions
      case 3:
        return (
          <View style={{alignItems: 'center'}}>
            <View style={mystyles.inputcontainer}>
              <Text
                style={{
                  marginVertical: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {userData.role === 'client'
                  ? 'What experience do you prefer from your therapist?'
                  : 'What professional therapeautic experiences do you posses'}
              </Text>
              {therapy_type.map((object) => (
                  <Checkbox
                    key={object}
                    label={object}
                    value={selectedTherapyType.includes(object)}
                    onCheck={() => handleTherapyExperienceToggle(object)}
                  />
                ))}
              
            </View>

            <View style={mystyles.inputcontainer}>
              <Text
                style={{
                  marginVertical: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                
                What languages can you speak? Choose all possible
              </Text>
  
                {languages.map((language) => (
                  <Checkbox
                    key={language}
                    label={language}
                    value={selectedLanguages.includes(language)}
                    onCheck={() => handleLanguageToggle(language)}
                  />
                ))}

              {userData.role === 'therapist' && (
                <View style={mystyles.inputcontainer}>
                  <Text style={mystyles.label}>
                    Briefly describe your professional life.
                  </Text>
                  <TextInput
                    style={mystyles.input}
                    value={formData.about_therapist}
                    onChangeText={text =>
                      setFormData({...formData,about_therapist: text})
                    }
                    numberOfLines={4}
                    maxLength={300}
                  />
                </View>
              )}
            </View>
            <View style={styles.buttoncontainer}>
              <CustomButton
                onPress={handlePrev}
                title="Previous"
                buttonStyle={styles.buttonStyle}
                textStyle={{color: 'white'}}
              />
              <CustomButton
                onPress={handleSubmit}
                title="Submit"
                buttonStyle={styles.buttonStyle}
                textStyle={{color: 'white'}}
                isLoading={isLoading}
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
      <View style={{alignItems: 'center', marginHorizontal: 20}}>
        <Image
          source={require('./../assets/mindbridgelogo_splash.png')}
          style={mystyles.logoimage}
        />
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          {userData.role === 'client'
            ? 'Help us pick a relationship therapist for you. This eases matching you with a therapist!'
            : 'Help us match you easily to patients'}
        </Text>

        {renderFormSection()}

        <View style={styles.bottomView}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            If you’re in a life-threatening situation, don’t use this app. Call
            988 or usethese resources.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OnBoardQtnsScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width * 0.4,
    height: 50,
    margin: 10,
  },
  buttoncontainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
  },
  picker: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputcontainer: {
    marginTop: 20,
    marginBottom: 5,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
