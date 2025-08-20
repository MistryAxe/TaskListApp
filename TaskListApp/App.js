import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    const trimmedText = taskText.trim();
    if (trimmedText === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>
          {item.done ? "☑️" : "⬜"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <View style={styles.addButton}>
          <Button title="Add" onPress={addTask} />
        </View>
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4285f4'
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  addButton: {
    marginLeft: 5
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  taskText: {
    flex: 1,
    fontSize: 16
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  checkbox: {
    marginRight: 10,
    fontSize: 18
  },
  deleteButton: {
    marginLeft: 10,
    fontSize: 18
  }
});