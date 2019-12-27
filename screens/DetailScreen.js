import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import DetailHeader from '../components/DetailHeader';
import NullPage from '../components/NullPage';
import { LinearGradient } from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window')

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon : ({tintColor}) => (
      <MaterialCommunityIcons name = 'book-open-page-variant' size ={30} style = {{color:tintColor}}/>
    )
  }

  post = this.props.navigation.getParam('post')

  _deletesignal = () => {
    this.props.navigation.navigate("MainScreen", {signal:this.post.id})
  }

  render(){
    return (
      <LinearGradient colors= {['#ffffff','#E0EAFC', '#ffffff', "#CFDEF3"]} style = {styles.background}>
      <SafeAreaView style={styles.container}>
        <DetailHeader deleteProp = {this._deletesignal}/>
        {this.post?
          <View>
            <View style = {styles.detailbox}>
              <Text style = {styles.detailtitle}>제목 : {this.post.title}</Text>
            </View>
            {
            this.post.imageUri?
            <Image source = {{uri : this.post.imageUri}} style = {styles.image}/> 
            : null
          }
            <View style = {styles.detailbox}>
              <Text style = {styles.detailcontent}>{this.post.content}</Text>
            </View>
          </View>
          :<NullPage/>
        }
      </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
  },
  container: {
  flex: 1,
  paddingTop:50,
  },
  textstyle: {
  fontSize: 30,
  },
  detailbox :{
  marginVertical:30,
  marginLeft:20,
  paddingLeft:20,
  },
  detailtitle:{
  fontSize: 30,
  },
  image:{
  marginLeft:22,
  paddingLeft:22,
  width : width -50,
  height: 200,
  borderColor: "#ACB6E5",
  borderWidth: 3,
  },
  detailcontent:{
  fontSize : 20,
  },
  });