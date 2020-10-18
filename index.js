import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';
import Routes from './src/services/Routes';
import {name as appName} from './app.json';
import { initializeFirebaseApi } from './src/services/FirebaseApi';
import {NavigationContainer} from '@react-navigation/native';
const wrappedRoutes = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
                <Routes />
            </SafeAreaView>
        </NavigationContainer>
    );
};
AppRegistry.registerComponent(appName, () => {
    initializeFirebaseApi();
    return wrappedRoutes;
}
   );
