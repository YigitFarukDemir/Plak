import { Text, View } from 'react-native'
import React, { Component } from 'react'
import * as MediaLibrary from 'expo-media-library';

export class AudioProvider extends Component {
    constructor(props){
        super(props)
    }

    permissionAllert = () => {
        Alert.alert("Izin gerekli", "Bu uygulama ses dosyalarini okuyabilmek icin izine ihtiyac duyuyor!", [{
            text: 'onayla',
            onPress: () => this.getPermission()
        },{
            text: 'reddet',
            onPress: () => this.permissionAllert()
        }])
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // ses dosyalarını oku
        }
        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain){
                //bu uygulama için ses dosyalrını okumak gerekli uyarısı
                this.permissionAllert()
            }
            if(status === 'granted'){
                //ses dosyalarını oku
            }
            if(status === 'denied' && !canAskAgain){
                //hata göster
            }
        }
    }

    componentDidMount(){
        getPermission()
    }

  render() {
    return (
      <View>
        <Text>AudioProvider</Text>
      </View>
    )
  }
}

export default AudioProvider