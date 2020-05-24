import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

import * as Animatable from 'react-native-animatable'

class Contact extends Component {

  render() {
    return(
      <View>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Information">
            <Text>121, Clear Water Bay Road</Text>
            <Text></Text>
            <Text>Clear Water Bay, Kowloon</Text>
            <Text></Text>
            <Text>HONG KONG</Text>
            <Text></Text>
            <Text>Tel: +852 1234 5678</Text>
            <Text></Text>
            <Text>Fax: +852 8765 4321</Text>
            <Text></Text>
            <Text>Email:confusion@food.net</Text>
            </Card>
        </Animatable.View>
      </View>
    );

  }
}


export default Contact;