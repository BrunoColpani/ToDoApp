import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../../Services/firebaseConnection";

export const Login = ({ changeStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("login");

  async function handleLogin() {
    if (type == "login") {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((error) => {
          console.log(error);
          alert("Email/senha incorretos!");
          return;
        });
    } else {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((error) => {
          console.log(error);
          alert("Algo deu errado!");
          return;
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu E-mail"
        value={email}
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="*******"
        value={password}
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType(type === "login" ? "cadastrar" : "login")}
      >
        <Text style={{ textAlign: "center" }}>
          {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: "#f2f6fc",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
  },
  handleLogin: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: "#FFF",
    fontSize: 17,
  },
});
