import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

let getID = (() => {
  let id = 0
  return () => id++
})()

class Activity {
  constructor(name, duration) {
    let id = getID()
    this.getName = () => name
    this.getDuration = () => duration
    this.getID = () => id
  }
  is(activity) {
    // NOTE these are reference objects, since they are equal by id.
    return this.getID() == activity.getID()
  }
  setName(name) {
    return new Activity(name, this.getDuration())
  }
  setDuration(duration) {
    return new Activity(this.getName(), duration)
  }
}

export default class App extends React.Component {
  state = {
    _activities : [],
  }
  addActivity(name, duration) {
    this.setState(prev => {
      return {_activities : prev._activities.concat(new Activity(name, duration))
    }})
  }
  setActivityName(activity, name) {
    this.setState(prev => {
      return {
        _activities : prev._activities.map(
        a => a.is(activity) ? a.setName(name) : a
      )}
    })
  }
  setActivityDuration(activity, duration) {
    this.setState(prev => {
      return {
        _activities : prev._activities.map(
        a => a.is(activity) ? a.setDuration(duration) : a
      )}
    })
  }
  removeActivity(activity) {
    this.setState(prev => {
      return {
        _activities : prev._activities.filter(
          a => !a.is(activity)
        )
      }
    })
  }
  _renderListItem(activity, index) {
    let a = activity
    return <View>
      <TextInput value={a.getName()} onChangeText={text => this.setActivityName(a, text)}></TextInput>
      <TextInput value={a.getDuration()} onChangeText={text => this.setActivityDuration(a, text)}></TextInput>
      <Button title={"Delete " + a.getName()} onPress={() => this.removeActivity(a)}></Button>
    </View>
  }
  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
      <Text> test </Text>
      <Text> test </Text>
      <Button title="Push me" onPress={() => this.addActivity('foo', 'bar')}></Button>
      <Text> test </Text>
      <FlatList
        data={[{key: 'a'}, {key: 'b'}]}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
      <Text> test </Text>
      <FlatList
        data={this.state._activities}
        keyExtractor={(_, index) => index}
        renderItem={this._renderListItem}
      />
      <Text> test </Text>
      <Text> test </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
