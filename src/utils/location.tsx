import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

interface Position { latitude?: number, longitude?: number }

function factory() {
    // 'use strict';

    let position: Position = { latitude: undefined, longitude: undefined  };

    function init() {

        Geolocation.getCurrentPosition((data) => {

            const { coords } = data

            if(!coords || !coords.latitude || !coords.longitude) return

            position = { latitude: coords.latitude, longitude: coords.longitude }

        },() => {},{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })

    }

    init()

    // Request permission to access location
    function requestAuthorization() {

        (async() =>{

            if(Platform.OS === 'ios') return Geolocation.requestAuthorization('whenInUse')
       
    
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    title: "Permissão de Localização",
                    message: "Este aplicativo precisa acessar sua localização.",
                    buttonNeutral: "Pergunte-me depois",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK",
                }
            )
    
            if(granted !== PermissionsAndroid.RESULTS.GRANTED) console.log("Permissão de localização negada")

        })()
        
    }

    // Return currentPosition of device
    function getPosition() {

        init()

        return position

    }

    return { requestAuthorization, getPosition };
}

const Location = factory();

export default Location;
