import { View,Text,Image, Dimensions, TextInput } from "react-native";
import React from "react";
import mystyles from "../assets/stylesheet";
import CustomButton from "../assets/widgets/custom_button";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

function ProfileScreen (){
    const navigation=useNavigation();
    return(
        <ScrollView contentContainerStyle={mystyles.dashviewcontainer }>
            <View >
                <Image
                    source={require('./../assets/mindbridgelogo_splash.png')}
                    style={mystyles.profileimage}
                />
                <CustomButton
                    onPress={()=>navigation.navigate('DashboardDrawer')}
                    title="Update photo"
                    textStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
                    />
            </View>


            <View style={{ backgroundColor:'#255ECC', textAlign:'left', width:Dimensions.get('window').width*1 , marginTop:-20}}>
                <Text style={{ fontSize:18, marginLeft:30 , color:'white'}}>Personal information</Text>
            </View>


            <View style={{ width:'90%' }}>
            <View style={{ alignItems:'center', marginTop:40 }}>
                <View style={{ marginBottom:20 }}>
                    <Text style={mystyles.dashlabel}>Your name</Text>
                    <TextInput
                        style={mystyles.dashinput}
                        value={null}
                    />
                </View>
                <View style={{ marginBottom:20 }}>
                    <Text style={mystyles.dashlabel}>Username</Text>
                    <TextInput
                        style={mystyles.dashinput}
                        value={null}
                    />
                </View>
                <View style={{ marginBottom:20 }}>
                    <Text style={mystyles.dashlabel}>Email address</Text>
                    <TextInput
                        style={mystyles.dashinput}
                        value={null}
                    />
                </View>
                <View style={{ marginBottom:20 }}>
                    <Text style={mystyles.dashlabel}>Phone number</Text>
                    <TextInput
                        style={mystyles.dashinput}
                        value={null}
                    />
                </View>
              </View>
              <CustomButton
              onPress={null}
              title="Change my password"
              buttonStyle={{ backgroundColor: 'transparent', width:Dimensions.get('window').width*0.8,alignItems:'left' }}
              textStyle={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontStyle:'italic' }}
              />
              <CustomButton
              onPress={()=>navigation.navigate('SignUpScreen')}
              title="Update"
              buttonStyle={{ backgroundColor: 'black', padding: 10, borderRadius: 15, width:Dimensions.get('window').width*0.9, }}
              textStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign:'center' }}
              />
              </View>

        </ScrollView>

       
    )
}
export default ProfileScreen;