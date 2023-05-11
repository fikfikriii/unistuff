import { StyleSheet, Text, View, SafeAreaView,Pressable, TextInput, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import 'firebase/firestore';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
    }

    const updateUser = async () => {
      await setDoc(
        doc(db, "users", `${userUid}`)
      )


    }

  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>welcome {user.email}</Text>
      </Pressable>

      

      <Pressable onPress={signOutUser}>
          <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Button, Alert } from 'react-native';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { firestore } from "firebase/firestore";

// const ProfileScreen = () => {
//   const user = auth.currentUser;
//   const navigation = useNavigation();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data from Firebase Firestore
//     const getUser = async () => {
//       const currentUser = await firestore()
//         .collection('users')
//         .doc(user.uid)
//         .get()
//         .then((documentSnapshot) => {
//           if (documentSnapshot.exists) {
//             console.log('User Data', documentSnapshot.data());
//             setUserData(documentSnapshot.data());
//           }
//         });
//     };
//     getUser();
//   }, []);

//   const handleUpdate = async () => {
//     firestore()
//       .collection('users')
//       .doc(user.uid)
//       .update({
//         fname: userData.fname,
//         lname: userData.lname,
//         email:userData.email,
//         phone: userData.phone,
//         university: userData.university,
//       })
//       .then(() => {
//         console.log('User Updated!');
//         Alert.alert('Profile Updated!', 'Your profile has been updated successfully.');
//       });
//   };

//   const signOutUser = () => {
//     signOut(auth)
//       .then(() => {
//         navigation.replace('Login');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <SafeAreaView>
//       <View>
//         <TextInput
//           placeholder="First Name"
//           placeholderTextColor="#666666"
//           autoCorrect={false}
//           value={userData ? userData.fname : ''}
//           onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
//         />
//       </View>
//       <View>
//         <TextInput
//           placeholder="Last Name"
//           placeholderTextColor="#666666"
//           value={userData ? userData.lname : ''}
//           onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
//           autoCorrect={false}
//         />
//       </View>

//       <Pressable onPress={handleUpdate}>
//         <Text>Update</Text>
//       </Pressable>

//       <Pressable onPress={signOutUser}>
//         <Text>Sign Out</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;