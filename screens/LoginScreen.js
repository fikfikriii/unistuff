import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ActivityIndicator,
    Image
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
    useEffect(() => {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(!authUser){
          setLoading(false);
        }
        if(authUser){
          navigation.replace("Home");
        }
      });
  
      return unsubscribe;
    },[])
    
    const login = () => {
      signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        console.log("user credential",userCredential);
        const user = userCredential.user;
        console.log("user details",user)
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
        {loading ? (
          <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
            <Image
              source={require('unistuff/assets/logo.png')}
              style={{ height:170, width:170, alignItems:"center", justifyContent:"center", marginLeft:25 }}
            />
            {/* <Text style={{marginRight:10,justifyContent:"center",flexDirection:"row"}}>Loading</Text> */}
            <ActivityIndicator size="large" color={"#005AAB"}/>
          </View>
        ) : (
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
              style={{ height:170, width:170, justifyContent:"center",flexDirection:"row"}}
            />
            <Text style={{ fontSize: 30, color: "#FBBA0C", fontWeight: "bold", marginTop:40 }}>
              Sign In
            </Text>
  
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600", color: "white" }}>
              Sign In to your account
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
                  color: "white"
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
                  color: "white"
                }}
              />
            </View>
  
            <Pressable
            onPress={login}
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
                Login
              </Text>
            </Pressable>
  
            <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Don't have a account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  