import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import firebase from "./src/Services/firebaseConnection";
import { Login } from "./src/Components/Login/Login";
import { TaskList } from "./src/Components/TaksList";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [key, setKey] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .once("value", (snapshot) => {
          setTasks([]);
          snapshot?.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };
            setTasks((oldTasks) => [...oldTasks, data]);
          });
        });
    }
    getUser();
  }, [user]);

  async function handleDelete(key) {
    await firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter((item) => item.key != key);
        setTasks(findTasks);
      });
  }

  async function handleUpdate(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  async function handleCreate() {
    if (newTask === "") {
      return;
    }

    if (key != "") {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key == key);
          let tasksClone = tasks;
          tasksClone[taskIndex].nome = newTask;
          setTasks([...tasksClone]);
        });
      Keyboard.dismiss();
      setNewTask("");
      setKey("");
      return;
    }

    let tarefas = firebase.database().ref("tarefas").child(user);
    let randomKey = tarefas.push().key;

    tarefas
      .child(randomKey)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: randomKey,
          nome: newTask,
        };
        setTasks((oldTasks) => [...oldTasks, data]);
      });
    Keyboard.dismiss();
    setNewTask("");
  }

  function cancelEdit() {
    setKey("");
    setNewTask("");
    Keyboard.dismiss();
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {key.length > 0 && (
        <View style={{ flexDirection: "row", marginBottom: 8, marginTop: 20 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <EvilIcons name="close-o" size={20} color="#FF0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: "#FF00000" }}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="Qual a próxima tarefa?"
          value={newTask}
          onChangeText={(task) => setNewTask(task)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleCreate}>
          <Text style={styles.buttonText}> +</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            updateItem={handleUpdate}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
  containerTask: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
  },
  buttonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 22,
  },
});
