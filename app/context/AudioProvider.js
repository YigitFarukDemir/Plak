import { Text, View } from 'react-native'
import React, { Component,createContext } from 'react'
import * as MediaLibrary from 'expo-media-library';
import {DataProvider} from 'recyclerlistview';

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props){
        super(props)
        this.state={
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
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

    getAudioFiles = async () => {
        const {dataProvider,audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), 
            audioFiles: [...audioFiles, ...media.assets]})
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // ses dosyalarını oku
            this.getAudioFiles()
        }
        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state,permissionError: true})
        }

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain){
                //bu uygulama için ses dosyalrını okumak gerekli uyarısı
                this.permissionAllert()
            }
            if(status === 'granted'){
                //ses dosyalarını oku
                this.getAudioFiles();
            }
            if(status === 'denied' && !canAskAgain){
                //hata göster
                this.setState({...this.state,permissionError: true})
            }
        }
    }

    componentDidMount(){
        this.getPermission()
    }

  render() {
    const {audioFiles,dataProvider,permissionError} = this.state
    if(permissionError) 
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center' ,
            }}>
            <Text style={{fontSize: 25,
                textAlign: 'center',
                color: 'blue'
            }}>Görünüşe göre müzik zevkini görmemizi istemiyorsun...</Text>
        </View>
    return <AudioContext.Provider value={{audioFiles, dataProvider}}>
        {this.props.children}
    </AudioContext.Provider>
  }
}

export default AudioProvider