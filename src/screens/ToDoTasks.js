import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';
import { TaskListView } from '../components/Components';
import { logoutFirebase } from '../services/FirebaseApi';
const imgChecList = require('../assets/png-clipart-checkbox-check-mark-checklist-computer-icons-others-miscellaneous-angle.png');
const imgPlus = require('../assets/43-437827_plus-clipart-plus-icon-orange-png-transparent-png.png');
const logoutImg = require('../assets/png-transparent-computer-icons-encapsulated-postscript-logo-logout-logo-sign-black-and-white.png');
export default class ToDoTasks extends Component {

    static navigationOptions = {
        tabBarLabel: 'To Do',
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgCheckList}
                   style={[styles.icon, { tintColor }]} />
        )
    }

    state = {
        tasks: []
    }

    render() {
        return (
            <View style={styles.container}>
                <TaskListView tasks={this.state.tasks}
                              navigation={this.props.navigation} />
                <TouchableOpacity style={styles.leftButton}
                                  onPress={() => this._logout()}>
                    <Image source={logoutImg} style={styles.img} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.floatButton}
                                  onPress={() => this._goToTask()}>
                    <Image source={imgPlus} style={styles.img} />
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }
    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => !t.isDone);
        this.setState({ tasks: tasksToDo });
    }

    _logout() {
        logoutFirebase().then(r =>{
            this.props.navigation.navigate('Login');
            Alert.alert('Logout successfull! ')

    });
        }
    _goToTask() {
        this.props.navigation.navigate('Task');
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    icon: {
        width: 26,
        height: 26
    },
    img: {
        width: 50,
        height: 50
    },
    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    leftButton: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 20
    }

});
