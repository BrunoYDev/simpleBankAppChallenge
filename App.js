import React, {Component} from 'react';

import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';

import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: 0,
      gender: '',
      accountLimit: 0,
      isStudent: false,
      genders: ['Select gender', 'male', 'female', 'others'],
      selectedGender: 0,
      incorret: false,
      verifyAge: false,
      accountCreated: false,
    };
    this.submitAccount = this.submitAccount.bind(this);
  }

  submitAccount() {
    this.setState({incorret: false});
    this.setState({verifyAge: false});
    let selectedGender = this.state.selectedGender;
    let age = this.state.age;
    let name = this.state.name;
    if (selectedGender === 0 || age >= 120 || name === '') {
      this.setState({incorret: true});
      return;
    }
    if (age < 18) {
      this.setState({verifyAge: true});
      return;
    }
    this.setState({gender: this.state.genders[selectedGender]});
    this.setState({accountCreated: true});
    return;
  }

  render() {
    let genderKey = -1;

    let allGender = this.state.genders.map(gender => {
      genderKey += 1;
      return <Picker.Item key={genderKey} value={genderKey} label={gender} />;
    });

    return (
      <View style={styles.container}>
        {this.state.accountCreated ? (
          <View>
            <Text style={styles.inputTitles}>Account Created!</Text>
            <Text style={styles.inputTitles}>Hello: {this.state.name}</Text>
            <Text style={styles.inputTitles}>You are: {this.state.age} years old</Text>
            <Text style={styles.inputTitles}>
              Your account limit is: ${this.state.accountLimit.toFixed(0)}
            </Text>
            <Text style={styles.inputTitles}>Your gender is {this.state.gender}</Text>
            <Text style={styles.inputTitles}>
              {this.state.isStudent ? 'You are student' : 'You are not student'}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.inputTitles}>Name: {this.state.name}</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={newName => this.setState({name: newName})}
            />
            <Text style={styles.inputTitles}>Age: {this.state.age} </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.inputStyle}
              onChangeText={newAge => this.setState({age: Number(newAge)})}
            />
            <Text style={styles.inputTitles}>
              Gender:{' '}
              {this.state.genders[this.state.selectedGender] === 'Select gender'
                ? ''
                : this.state.genders[this.state.selectedGender]}
            </Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.selectedGender}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedGender: itemValue})
              }>
              {allGender}
            </Picker>
            <Text style={styles.inputTitles}>
              Account Limit: {this.state.accountLimit.toFixed(0)}
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={styles.sliderStyle}
              value={this.state.accountLimit}
              onValueChange={actualValue =>
                this.setState({accountLimit: actualValue})
              }
            />
            <Text style={styles.inputTitles}>
              You are student?: {this.state.isStudent ? 'Yes' : 'No'}
            </Text>
            <Switch
              value={this.state.isStudent}
              onValueChange={switchState =>
                this.setState({isStudent: switchState})
              }
            />
            {this.state.incorret ? (
              <Text>Please insert the information correctly</Text>
            ) : (
              ''
            )}
            {this.state.verifyAge ? (
              <Text>You need at least 18 years old</Text>
            ) : (
              ''
            )}
            <Button title="Open Account" onPress={this.submitAccount} />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitles: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyle: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 200,
    fontSize: 20,
  },
  sliderStyle: {
    width: 250,
  },
  pickerStyle: {
    width: 200,
  },
});

export default App;
