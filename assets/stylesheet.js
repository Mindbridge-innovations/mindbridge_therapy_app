// styles.js

import {Dimensions, StyleSheet} from 'react-native';

const mystyles = StyleSheet.create({
  //styles for full page alignment
  containerview: {
    flexGrow: 1,
    justifyContent: 'space-around',
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: '#255ECC',
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
    resizeMode: 'cover', // or 'contain', 'stretch', 'center'
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
});

export default mystyles;
