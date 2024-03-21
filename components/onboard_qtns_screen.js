import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import CustomButton from '../assets/widgets/custom_button';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import mystyles from '../assets/stylesheet';
import {useNavigation} from '@react-navigation/native';
import { DatePicker,TimePicker} from './dashboard_components/datePicker';
import Checkbox from '../assets/widgets/checkBox';
import Config from '../config';

const OnBoardQtnsScreen = ({route}) => {
  // defining the navigation variable to shift btn screens
  const navigation = useNavigation();

  // defining the route parameter
  const {params} = route;
  const userData = params ? params.userData : null;

  

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
    'Marriage and Family Therapy', 'Substance Abuse Counseling', 'Trauma and PTSD Treatment',
    'Child and Adolescent Therapy', 'LGBTQ+ Counseling', 'Education mindset councelling', 'Career Counseling',
  ];

  //lookup to map the therapy_type array to the therapy experiences qtns
  const therapyTypeLookup = {
    'Marriage and Family Therapy': 'marriageAndFamilyTherapy',
    'Substance Abuse Counseling': 'substanceAbuseCounseling',
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
      marriageAndFamilyTherapy:1,substanceAbuseCounseling:2,traumAandPTSDTreatment:3,childAndAdolescentTherapy:4,LGBTQCounseling:5,educationMindsetCouncelling:6, careerCounseling:7,

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
    full_name: '',
    experience_yrs: '',
    dob:formatDate(date),
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

  console.log(selectedLanguages)
  

  // logic to move to next question screen
  const handleNext = () => {
    // You can perform validation here if needed
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
    full_name: formData.full_name,
    experience_yrs: formData.experience_yrs,
    dob: formatDate(date),
    // ... any other fields ...
  };
  
  const handleSubmit = async () => {
    const payload={
      username:userData.username,
      email:userData.email,
      password:userData.password,
      firstName:userData.firstName,
      lastName:userData.lastName,
      phoneNumber:userData.phoneNumber,
      role:userData.role,
      responses:responsesPayload
  
      
    }
   console.log(payload)
    if (userData.password != userData.password_confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      // Replace 'http://your-backend-url.com' with your actual backend URL
      const response = await fetch(`${Config.BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful registration
        alert(
          'Registration successful, please check your email for confirmation',
        );
        navigation.navigate('SignInScreen');
      } else {
        // Handle errors
        alert(result.message);
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred: ' + error.message);
    }
  };



  const renderFormSection = () => {
    switch (currentStep) {
      //first screen of the questions
      case 1:
        return (
          <View style={{alignItems: 'center'}}>
            <View style={styles.inputcontainer}>
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

            
              <View style={styles.inputcontainer}>
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

            {userData.role === 'Patient' && (
              <View style={styles.inputcontainer}>
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
            {userData.role === 'Patient' && (
              <View style={styles.inputcontainer}>
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

          {userData.role === 'Patient' && (
              <View style={styles.inputcontainer}>
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

           

            {userData.role === 'Patient' && (
              <View style={styles.inputcontainer}>
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

            {userData.role === 'Therapist' && (
              <View style={styles.inputcontainer}>
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

            {userData.role === 'Therapist' && (
              <View style={styles.inputcontainer}>
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
              <View style={styles.inputcontainer}>
               
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
            <View style={styles.inputcontainer}>
              <Text
                style={{
                  marginVertical: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {userData.role === 'Patient'
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

            <View style={styles.inputcontainer}>
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

              {userData.role === 'Therapist' && (
                <View style={styles.inputcontainer}>
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
          {userData.role === 'Patient'
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
