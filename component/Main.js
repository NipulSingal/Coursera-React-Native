import React, { Component } from 'react';
import Menu from './Menu';
import Dishdetail from './Dishdetail';
import { View, Platform } from 'react-native';
// import { DISHES } from '../shared/dishes';
import Home from './Home'
import { createStackNavigator , createDrawerNavigator} from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

const HomeNavigator= createStackNavigator({
    Home: { screen: Home },
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);
const MainNavigator=createDrawerNavigator({
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            title: 'Home',
            drawerLabel:'Home'
        }
    },
    Menu:{
        screen:MenuNavigator,
        navigationOptions:{
            title: 'Menu',
            drawerLabel:'Menu'
        }
    }
},{
    drawerBackgroundColor:'#D1C4E9'
})
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
      };
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
    }
  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>   );
  }
}
  
export default Main;