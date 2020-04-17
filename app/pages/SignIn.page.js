import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{backgroundColor: '#F8F8F8', flex: 1, paddingHorizontal: 24}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#FFC60B', fontSize: 48, fontWeight: 'bold', letterSpacing: 16, textAlign: 'center'}}>HIVEZ</Text>
        </View>
        <View style={{backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 8, shadowColor: "#000"}}>
          <Text style={{fontWeight: 'bold', marginVertical: 32, textAlign: 'center'}}>Sign in to continue</Text>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            placeholder="Email"
            style={{backgroundColor: '#F8F8F8', borderColor: 'rgba(112, 112, 112, 0.5)', borderWidth: 1, borderRadius: 6, height: 40, marginVertical: 8, paddingHorizontal: 16}}
            value={this.state.text}
          />
          <TouchableHighlight style={{backgroundColor: '#FFC60B', borderRadius: 6, height: 40, marginVertical: 8}} underlayColor="white">
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#333333', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>Next</Text>
            </View>
          </TouchableHighlight>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 32, width: '100%'}}>
            <Text style={{color: '#FFC60B', flex: 1, fontWeight: 'bold', textAlign: 'center'}}>Forgot password?</Text>
            <Text style={{color: '#FFC60B', flex: 1, fontWeight: 'bold', textAlign: 'center'}}>Sign up for account</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginVertical: 24}}>
            <Text style={{color: '#FFC60B', flex: 1, fontWeight: 'bold', paddingHorizontal: 8, textAlign: 'right'}}>Privacy policy</Text>
            <Text style={{color: '#FFC60B', flex: 1, fontWeight: 'bold', paddingHorizontal: 8, textAlign: 'left'}}>Term of use</Text>
          </View>
        </View>
      </View>
    );
  }
}