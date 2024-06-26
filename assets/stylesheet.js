// styles.js

import {Dimensions, StyleSheet} from 'react-native';

const mystyles = StyleSheet.create({
  picker: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  //styles for full page alignment
  containerview: {
    flexGrow: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: '#255ECC',
  },
  scrollViewContainer: {
    flex: 1, // Center the content horizontally
    marginHorizontal:10,

  },
  //style for input labels

  label: {
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  //styles for text input fields
  input: {
    backgroundColor: '#edede9',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
    color: 'black',
    fontSize:16
  },
  dashlabel: {
    color: '#255ECC',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dashlabelWhite: {
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  //styles for text input fields
  dashinput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    color: 'black',
  },

  picker: {
    backgroundColor: '#edede9',
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
  custombutton: {
    backgroundColor: 'black',
    width: '50%',
    alignItems: 'center',
    marginHorizontal: 1,
  },

  logoimage: {
    width: 100,
    height: 80,
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
    borderRadius: 10, // if you want to add borderRadius
    marginBottom: 20,
    marginTop: 20,
  },

  //   view containe for dasboard screens

  dashviewcontainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    alignItems: 'center',
  },

  // profile image styling
  profileimage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch', // or 'contain', 'stretch', 'center'
    borderRadius: 9999, // if you want to add borderRadius
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: '#255ECC',
    color: 'white',
    paddingLeft: 20,
  },

  dateTimeContainer: {
    marginBottom: 20,
  },

  // checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#f1e8e6',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 16,
    color:'white'
  },
  //style for the loading indicator
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },


  // styles for the resources screen
  resourceCategory:{
    backgroundColor:'#429ef5',
    paddingVertical:10,
    marginVertical:10,
    borderRadius:2
  },
  categoryText:{
    color:'white',
    marginLeft:5
  },
  categoryLinks:{
    marginVertical:10,
  }
});

export default mystyles;
