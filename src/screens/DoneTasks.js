import React, {Component} from 'react';
import {TaskListView} from '../components/Components';
import {Image, StyleSheet, View} from 'react-native';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';
const imgDone = require('../assets/png-transparent-computer-icons-check-mark-done-miscellaneous-angle-text-thumbnail.png');

export default class DoneTasks extends Component {
    state = {
        tasks: []
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <TaskListView tasks={this.state.tasks}/>
            </View>
        )
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => t.isDone);
        this.setState({tasks: tasksToDo});
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
    }
});
