import {  useNavigation} from '@react-navigation/native';
import React from "react";
import {  Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import CustomButton from '../assets/widgets/custom_button';


function HomePage(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <View style={{ marginHorizontal:20,alignItems: 'center', }}>
              {/* <Button title="Make Video Call" onPress={() => { navigation.navigate('VideoCallPage') }} /> */}
              <Image
                source={require('./../assets/mindbridgelogo_splash.png')}
                style={styles.logoimage}
              />
              <Text style={{ color:'white', fontSize:24, fontWeight:'bold', marginVertical:5, }}>
              No appointments required
              </Text>
              <Text style={{ color:'white', marginVertical:20, textAlign:'center' }}> 
                Send text, audio, and video messages from anywhere at anytime. Guaranteed daily responses 5 days per week.
                </Text>
              <Image
                source={require('./../assets/images/welcomeimage.png')}
                style={styles.welimage}
              />
              <CustomButton
              onPress={()=>navigation.navigate('SignUpScreen')}
              title="Get started"
              buttonStyle={{ backgroundColor: 'black', padding: 10, borderRadius: 15, width:250, }}
              textStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
              />

              <View style={{  flexDirection:'row', marginVertical:20 }}>
              <Text style={{ color:'white' }}>Already signed up? </Text>
              <CustomButton
              onPress={()=>navigation.navigate('SignInScreen')}
              title="Sign in"
              buttonStyle={{ backgroundColor: 'transparent' }}
              textStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
              />

              </View>
              
            </View>
        </View>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-around',
        fontSize:16, 
        backgroundColor:'#1D29D0'

    },
  
  logoimage: {
    width: 100,
    height: 80,
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
    borderRadius: 10, // if you want to add borderRadius
  },
  welimage: {
    width:Dimensions.get('window').width*0.7,
    height: 300,
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
    borderRadius: 10, // if you want to add borderRadius
  },
  button:{
    textAlign:'center'
  }
});



/* <Stack.Navigator initialRouteName="HomePage">  */