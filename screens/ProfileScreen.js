import { StyleSheet, Text, View, SafeAreaView,Pressable, TextInput, Alert, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth,db } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons'; 

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const [name,setname] = useState("")
    const [phone,setPhone] = useState("")
    const [university,setUniversity] = useState("")
    const [isnameEdited, setIsnameEdited] = useState(false);
    const [isPhoneEdited, setIsPhoneEdited] = useState(false);
    const [isUniversityEdited, setIsUniversityEdited] = useState(false);

    useEffect(() => {
      const fetchUserData = async () => {
        const myUserUid = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, "users", myUserUid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setname(userData.name || "");
          setPhone(userData.phone || "");
          setUniversity(userData.university || "");
        }
      };
  
      fetchUserData();
    }, []);

    const signOutUser = () => {
      Alert.alert(
        'Sign Out Confirmation',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: () => {
              signOut(auth).then(() => {
                navigation.replace('Login');
              }).catch(err => {
                console.log(err);
              });
            },
          },
        ],
        { cancelable: false }
      );
    };

    const updateUser = () => {
      const myUserUid = auth.currentUser.uid;
    
      updateDoc(doc(db, "users", `${myUserUid}`), {
        name: name,
        phone: phone,
        university: university,
      })
      .then(() => {
        Alert.alert('Success', 'Data updated!');
      })
      .catch((error) => {
        console.log(error);
      });
    };
    
    const handlenameChange = (text) => {
      setname(text);
      setIsnameEdited(true);
    };
  
    const handlePhoneChange = (text) => {
      setPhone(text);
      setIsPhoneEdited(true);
    };
  
    const handleUniversityChange = (text) => {
      setUniversity(text);
      setIsUniversityEdited(true);
    };

return (
  <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Image
              source={require('unistuff/assets/logo.png')}
              style={{ height:130, width:130}}
    />
    <Pressable style={{ marginVertical: 5 }}>
      <Text style={{marginTop:15 ,fontSize: 22, fontWeight: "bold"}}>Hello, {name ? name : user.email} </Text>
    </Pressable>

    <Pressable style={{ marginVertical: 5 }}>
      <Text style={{fontSize: 18, fontWeight: "500"}}>
        Edit Your Profile Here
      </Text>
    </Pressable>

    <View style={{ marginTop: 50 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="person-circle" size={24} color="black" />
        <TextInput
            placeholder="Your Name"
            value={name}
            onChangeText={handlenameChange}
            placeholderTextColor="gray"
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              width: 300,
              marginVertical: 10,
              color: isnameEdited ? "black" : "gray"
            }}
          />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="phone" size={24} color="black" />
        <TextInput
            placeholder="Your Phone Number"
            value={phone}
            onChangeText={handlePhoneChange}
            placeholderTextColor="gray"
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 19,
              width: 300,
              marginVertical: 10,
              color: isPhoneEdited ? "black" : "gray"
            }}
          />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="university" size={24} color="black" />
        <TextInput
            placeholder="Your University"
            value={university}
            onChangeText={handleUniversityChange}
            placeholderTextColor="gray"
            style={{
              fontSize: 18,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginLeft: 13,
              width: 300,
              marginVertical: 10,
              color: isUniversityEdited ? "black" : "gray"
            }}
          />
      </View>

    </View>

    <Pressable 
      onPress={updateUser}
      style={{
        width: 200,
        backgroundColor: "#19b50b",
        padding: 15,
        borderRadius: 7,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
      }}  
    >
      <Text 
        style={{ 
          fontWeight:"bold", 
          fontSize: 18, 
          textAlign: "center", 
          color: "black" }}>Update</Text>
    </Pressable>
    
    <Pressable 
      onPress={() => navigation.navigate("YourOrder")}
      style={{
        width: 200,
        backgroundColor: "#19b50b",
        padding: 15,
        borderRadius: 7,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
      }}  
    >
      <Text 
        style={{ 
          fontWeight:"bold", 
          fontSize: 18, 
          textAlign: "center", 
          color: "black" }}>Your Order</Text>
    </Pressable>

    <Pressable 
      onPress={signOutUser}
      style={{
        width: 200,
        backgroundColor: "red",
        padding: 15,
        borderRadius: 7,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Text style={{ 
          fontWeight:"bold", 
          fontSize: 18, 
          textAlign: "center", 
          color: "white" }}>Sign Out</Text>
    </Pressable>
  </SafeAreaView>
)};


export default ProfileScreen

const styles = StyleSheet.create({})