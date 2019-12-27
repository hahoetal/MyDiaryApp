import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import {AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon : ({tintColor}) => (
      <MaterialCommunityIcons name = 'calendar-multiselect' size ={30} style = {{color:tintColor}}/>
    )
  }

  _storeData = async() => {
    await AsyncStorage.setItem('@diary:state', JSON.stringify(this.state))
  }

  _getData = async() => {
    const mystate = await AsyncStorage.getItem("@diary:state")
    if (mystate !== null){
      this.setState(JSON.parse(mystate))
    }
  }

  constructor(props){
    super(props)
    this.state ={
      selectedDate : '',
      
      Posts:[
      {
        id : '',
        title: '',
        content : '',
        date: '',
      },      
    ]
  }
}

componentDidMount(){
  this._getData()
  this.props.navigation.addListener(
    'didFocus',
    () => {
      newpost = this.props.navigation.getParam('myparam')
      signal = this.props.navigation.getParam('signal')

      if (newpost){
        const PrevPosts = [...this.state.Posts]
        this.setState({Posts : PrevPosts.concat(newpost)}, this._storeData)
        this.props.navigation.navigate('MainScreen', {myparam : false})
      }
      else if (signal){
        const PrevPosts2 = [...this.state.Posts]

        deleteIndex = PrevPosts2.findIndex((item) => {return item.id == signal})
        PrevPosts2.splice(deleteIndex, 1)

        this.setState({Posts: PrevPosts2}, this._storeData)
        this.props.navigation.navigate('MainScreen', {signal: false})
      }
    }
  );
}

  render(){
    return (
      <LinearGradient colors= {['#ffffff','#E0EAFC', '#ffffff', "#CFDEF3"]} style = {styles.background}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style ={styles.header}>My Story</Text>
        </View>
        <Calendar
          onDayPress = {(day) => {this.setState(this.state.selectedDate = day)}}
          current = {new Date()}/>
          <ScrollView>
            <FlatList
              data = {this.state.Posts.filter(data => {return data.date == this.state.selectedDate.dateString})}
              renderItem = {({item, index}) => {
                return (
                  <TouchableOpacity
                    style = {styles.listitem}
                    onPress = {() => {this.props.navigation.navigate('Detail', {post:item})}}>
                    <View>
                      <Text style = {styles.listtext}>제목 : {item.title}</Text>
                      <Text style = {styles.listtext}>내용: {item.content}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
              keyExtractor = {(item, index) => {return `$(index)`}} />
          </ScrollView>
      </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
  },
  header:{
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20,
  },
  listitem:{
  marginLeft:50,
  marginTop:20,
  borderLeftColor: "#ACB6E5",
  borderLeftWidth: 4,
  paddingLeft:30,
  },
  container: {
  flex: 1,
  paddingTop:50,
  },
  textstyle:{
  fontSize:40,
  },
  listtext:{
  fontSize : 20,
  }
  });
  