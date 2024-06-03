// DashboardDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppointmentManagementScreen from './Appointments';
import PatientListScreen from './mypatients';
import MyFeedbacks from './queryFeedbacks';
import MyRatings from './queryRatings';
import TherapistListScreen from './mytherapists';
import ProfileScreen from '../profile';
import ResourcesScreen from './ResourcesScreen';
import OnBoardQtnsScreen from '../onboard_qtns_screen';
import CustomDrawerContent from './CustomDrawerContent';
import { Dimensions } from 'react-native';


const Drawer = createDrawerNavigator();

const DashboardDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Appointments"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: '#ADD8E6', width: Dimensions.get('window').width*0.8 },
        drawerActiveBackgroundColor: 'blue',
      }}>
      <Drawer.Screen name="My appointments" component={AppointmentManagementScreen} />
      <Drawer.Screen name="My patients" component={PatientListScreen} />
      <Drawer.Screen name="Feedback/review" component={MyFeedbacks} />
      <Drawer.Screen name="Ratings/review" component={MyRatings} />
      <Drawer.Screen name="My therapists" component={TherapistListScreen} />
      <Drawer.Screen name="Find a therapist" component={OnBoardQtnsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Resource Library" component={ResourcesScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawer;