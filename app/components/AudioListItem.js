import { Dimensions, Text, View } from 'react-native'
import React, { Component } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import color from '../misc/color';

const AudioListItem = () => {
    return (
        <>
      <View style={styles.container}>
        <View style={styles.leftcontainer}>
            <View style={styles.thumbnail}>
                <Text style={styles.thumbnailText}>A</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>Title</Text>
                <Text style={styles.time}>3:59</Text>
            </View>          
        </View>
        <View style={styles.rightcontainer}>
            <Entypo name="dots-three-vertical" size={20} color={color.FONT_MEDIUM} />
        </View>
      </View>
      <View style={styles.separator} />
      </>
    )
  }
  const {width} = Dimensions.get('window')
  const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
    },
    leftcontainer:{
        flexDirection: 'row',
        alignSelf: 'center',    
        flex: 1,    
    },
    rightcontainer:{
        flexBasis:50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',              
    },
    thumbnail:{
        height: 50,
        flexBasis: 50,
        backgroundColor: color.FONT_LIGT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    titleContainer:{
        width: width - 180,
        paddingLeft: 10,
    },
    title:{
        fontSize: 16,
        color: color.FONT,

    },
    separator:{
        width: width -80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        margintop: 10,
    },
    time:{
        fontSize: 14,
        color: color.FONT_LIGT,
    }
  })

  export default AudioListItem;