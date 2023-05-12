import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Alert,
    Image,
  } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
  const RegisterScreen = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [phone,setPhone] = useState("");
      const navigation = useNavigation();
      const register = () => {
        if(email === "" || password === "" || phone === ""){
          Alert.alert(
            "Invalid Details",
            "Please fill all the details",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => { 
          console.log("user credential",userCredential);
          const user = userCredential._tokenResponse.email;
          const myUserUid = auth.currentUser.uid;
  
          setDoc(doc(db,"users",`${myUserUid}`),{
            name: "",
            email:user,
            phone:phone,
            university:""
          })
        })
      }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#005AAB",
          alignItems: "center",
          padding: 10,
        }}
      >
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Image
              source={require('unistuff/assets/logo.png')}
              style={{ height:170, width:170}}
            />
            <Text style={{ fontSize: 20, color: "#FBBA0C", marginTop:40, fontWeight: "bold" }}>
              Register
            </Text>
  
            <Text style={{ color:"white", fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Create a new Account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="white"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                  color:"white"
                }}
              />
            </View>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="white"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                  color:"white"
                }}
              />
            </View>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="white" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone No"
                placeholderTextColor="white"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                  color:"white"
                }}
              />
            </View>
  
            <Pressable
              onPress={register}
              style={{
                width: 200,
                backgroundColor: "#FBBA0C",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ fontWeight:"bold", fontSize: 18, textAlign: "center", color: "black" }}>
                Register
              </Text>
            </Pressable>
  
            <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Already have a account? Sign in
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({});
  