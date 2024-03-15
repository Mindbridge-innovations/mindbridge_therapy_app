import React from "react";
import { View, Image,Text, Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import mystyles from "../../assets/stylesheet";
import CustomButton from "../../assets/widgets/custom_button";
import { useNavigation } from "@react-navigation/native";


const TherapistDetailsScreen=({route})=>{
    const { therapist } = route.params;
    const navigation=useNavigation();
    return(

    <ScrollView contentContainerStyle={mystyles.dashviewcontainer}>
        <View style={{ backgroundColor:'#255ECC', width:'100%', height:44 }}>
            <Text style={{ color:'white', fontSize:18, fontWeight:'bold',marginLeft:30, marginTop:10 }}>Dr. {therapist.name}</Text>
        </View>
        <View style={{flex:1, alignItems:'center', width:'90%' }}>
            {/* displaying the therapist profile image */}
            <Image
                source={require("../../assets/images/doctor_avatar.jpeg")}
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
            <View style={{ backgroundColor:'lightgray' , borderRadius:10}}>
                <View style={{ padding:10 }}>
                    <Text style={{ fontWeight:'bold' }}>Speciality: {therapist.specialty}</Text>
                    <Text style={{ fontWeight:'bold',fontSize:18, marginVertical:20 }}>About me</Text>
                    <Text style={{ fontSize:16 }}>{therapist.about}</Text>
                </View>
            </View>

            <View >
                <View style={{ flexDirection:'row', marginTop:40 }}>
                    <CustomButton
                        onPress={()=>navigation.navigate('AppointmentBookingScreen')}
                        title="Book appointment"
                        buttonStyle={styles.custombutton}
                        textStyle={{ color: 'white', fontWeight: 'bold' }}
                        />

                    <CustomButton
                        onPress={()=>navigation.navigate('Chat')}
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
        },
        avatar:{
            width:'100%',
            borderRadius:10,
            marginVertical:30,

        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 20,
            marginBottom:30,
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
    }
)