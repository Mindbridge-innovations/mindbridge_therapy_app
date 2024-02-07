import React from "react";
import { View, Image,Text, Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import mystyles from "../../assets/stylesheet";
import CustomButton from "../../assets/widgets/custom_button";
import { useNavigation } from "@react-navigation/native";
import AppointmentBookingScreen from "./bookappointment";


const TherapistDetailsScreen=({route})=>{
    const { therapist } = route.params;
    const navigation=useNavigation();
    return(

    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
        <View style={{flex:1, alignItems:'center', width:'90%' }}>
            <Image
                source={require("../../assets/mindbridgelogo_splash.png")}
                style={mystyles.profileimage}
            />
            {/* <Text>{therapist.name}</Text> */}
            <View style={{ backgroundColor:'lightgray' , borderRadius:10}}>
                <View style={{ padding:10 }}>
                    <Text>Therapist name: {therapist.name}</Text>
                    <Text>Therapist speciality: {therapist.specialty}</Text>
                    <Text>About me: {therapist.about}</Text>
                </View>
            </View>

            <View style={{ backgroundColor:'lightgray', borderRadius:10,marginTop:30, }}>
                <View >
                    <View style={{ flexDirection:'row', marginTop:40 }}>
                        <CustomButton
                            onPress={()=>navigation.navigate('AppointmentBookingScreen')}
                            title="Book appointment"
                            buttonStyle={styles.custombutton}
                            textStyle={{ color: 'white', fontWeight: 'bold' }}
                            />

                        <CustomButton
                            onPress={null}
                            title="Message chat"
                            buttonStyle={styles.custombutton}
                            textStyle={{ color: 'white', fontWeight: 'bold' }}
                            />
                    </View>

                    <View style={{ flexDirection:'row',  }}>
                        <CustomButton
                            onPress={()=>navigation.navigate('VideoCallPage')}
                            title="Video call"
                            buttonStyle={styles.custombutton}
                            textStyle={{ color: 'white', fontWeight: 'bold' }}
                            />

                        <CustomButton
                            onPress={null}
                            title="Voice call"
                            buttonStyle={styles.custombutton}
                            textStyle={{ color: 'white', fontWeight: 'bold'}}
                            />
                    </View>

                </View>

               
            </View>

        </View>
    </ScrollView>
    )

}
export default TherapistDetailsScreen;

const styles=StyleSheet.create(
    {
        custombutton:{
            backgroundColor: 'black',
             width:'50%',
             alignItems:'center',
             marginHorizontal:1
        }
    }
)