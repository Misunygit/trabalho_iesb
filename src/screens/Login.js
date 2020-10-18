import React, {useState} from 'react';
import {SafeAreaView, KeyboardAvoidingView, View, Image, TextInput, Button, Text,
    Alert, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
const img = require('../assets/1567073.png');
const Login = props => {
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');

    const signInAsync = async () => {
        try {
            const user = await signInOnFirebaseAsync(email, password);
            Alert.alert(
                'User Authenticated',
                `User ${user.email} has succesfuly been authenticated!`,
            );
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'TaskList'}],
                }),
            );
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        }
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType={'email-address'}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    <Button title="Sign In" onPress={() => signInAsync()} />

                    <View style={styles.textConteiner}>
                        <Text>Not a member? Let's </Text>
                        <Text
                            style={styles.textRegister}
                            onPress={() => {
                                props.navigation.navigate('Register');
                            }}>
                            Register
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});
export default Login;
