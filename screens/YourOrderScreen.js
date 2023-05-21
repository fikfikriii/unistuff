// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
// import { collection, doc, getDoc } from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import { auth, db } from '../firebase';

// const YourOrderScreen = () => {
//     const [orderHistory, setOrderHistory] = useState([]);
//     const [pickupDetails, setPickupDetails] = useState({});
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchOrderHistory = async () => {
//             try {
//                 const currentUserUid = auth.currentUser.uid;
//                 const userDoc = await getDoc(doc(db, 'users', currentUserUid));
//                 if (userDoc.exists()) {
//                     const userData = userDoc.data();
//                     const orders = userData.orders || {};
//                     const pickup = userData.pickUpDetails || {};

//                     // Convert the orders map to an array
//                     const orderArray = Object.values(orders);
//                     setOrderHistory(orderArray);
//                     setPickupDetails(pickup);
//                 }
//             } catch (error) {
//                 console.error('Error fetching order history:', error);
//             }
//         };

//         fetchOrderHistory();
//     }, []);

//     const formatPickupDate = () => {
//         if (pickupDetails && pickupDetails.pickUpDate) {
//             const date = pickupDetails.pickUpDate.toDate();
//             return date.toDateString();
//         }
//         return '';
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <View style={styles.imageContainer}>
//                 <Image style={styles.image} source={{ uri: item.image }} />
//             </View>

//             <View style={styles.detailsContainer}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
//                 <Text style={styles.price}>Price: Rp{item.price}</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.headingContainer}>
//                 <Text style={styles.heading}>Your Order</Text>
//             </View>
//             <Text style={styles.location}>Location: {pickupDetails.location}</Text>
//             <Text style={styles.pickUpDate}>Pick-up Date: {formatPickupDate()}</Text>
//             <Text style={styles.selectedTime}>Selected Time: {pickupDetails.selectedTime}</Text>

//             <FlatList
//                 data={orderHistory}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     headingContainer: {
//         marginTop: 80, // Add top margin
//         alignItems: 'center',
//     },
//     heading: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginBottom: 30,
//     },
//     card: {
//         backgroundColor: '#F8F8F8',
//         borderRadius: 8,
//         padding: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 14,
//     },
//     imageContainer: {},
//     image: {
//         width: 70,
//         height: 70,
//     },
//     detailsContainer: {
//         flex: 1,
//         marginLeft: 10,
//     },
//     name: {
//         width: 200,
//         fontSize: 17,
//         fontWeight: '500',
//         marginBottom: 7,
//     },
//     quantity: {
//         color: 'gray',
//         fontSize: 13,
//     },
//     price: {
//         color: 'gray',
//         fontSize: 13,
//     },
//     location: {
//         fontSize: 16,
//         marginBottom: 6,
//     },
//     pickUpDate: {
//         fontSize: 16,
//         marginBottom: 6,
//     },
//     selectedTime: {
//         fontSize: 16,
//         marginBottom: 6,
//     },
// });

// export default YourOrderScreen;

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const YourOrderScreen = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [pickupDetails, setPickupDetails] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const currentUserUid = auth.currentUser.uid;
                const userDoc = await getDoc(doc(db, 'users', currentUserUid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const orders = userData.orders || {};
                    const pickup = userData.pickUpDetails || {};

                    // Convert the orders map to an array
                    const orderArray = Object.values(orders);
                    setOrderHistory(orderArray);
                    setPickupDetails(pickup);
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, []);

    const formatPickupDate = () => {
        if (pickupDetails && pickupDetails.pickUpDate) {
            const date = pickupDetails.pickUpDate.toDate();
            return date.toDateString();
        }
        return '';
    };

    const handleCompleteOrder = async () => {
        try {
            const currentUserUid = auth.currentUser.uid;
            await updateDoc(doc(db, 'users', currentUserUid), {
                orders: {},
                pickUpDetails: {},
            });
            setOrderHistory([]);
            Alert.alert('Order Completed', 'Your order has been completed successfully.');
        } catch (error) {
            console.error('Error completing order:', error);
            Alert.alert('Error', 'Failed to complete the order. Please try again later.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.price}>Price: Rp{item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {orderHistory.length > 0 ? (
                <>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Your Order</Text>
                    </View>
                    <Text style={styles.location}>Location: {pickupDetails.location}</Text>
                    <Text style={styles.pickUpDate}>Pick-up Date: {formatPickupDate()}</Text>
                    <Text style={styles.selectedTime}>Selected Time: {pickupDetails.selectedTime}</Text>
                    <FlatList
                        data={orderHistory}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
                        <Text style={styles.completeButtonText}>Complete Order</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="cart-off" size={100} color="black" justifyContent="center" />
                    <Text style={styles.noOrderText}>You Don't Have Any Ongoing Order</Text>
                </View>
            )}

            <Pressable 
                onPress={() => navigation.navigate("Home")}
                style={{
                    width: 200,
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 7,
                    marginTop: 0,
                    marginBottom: 55,
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderColor: "gray",
                    borderWidth: 3
                }}  
                >
                <Text 
                    style={{ 
                    fontWeight:"bold", 
                    fontSize: 18, 
                    textAlign: "center", 
                    color: "black" }}>Back To Home</Text>
            </Pressable>
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    headingContainer: {
        marginTop: 50, // Add top margin
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        marginTop: 15,
    },
    imageContainer: {},
    image: {
        width: 70,
        height: 70,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        width: 200,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
    },
    quantity: {
        color: 'gray',
        fontSize: 13,
    },
    price: {
        color: 'gray',
        fontSize: 13,
    },
    location: {
        fontSize: 18,
        marginBottom: 6,
    },
    pickUpDate: {
        fontSize: 18,
        marginBottom: 6,
    },
    selectedTime: {
        fontSize: 18,
        marginBottom: 6,
    },
    completeButton: {
        backgroundColor: '#19b50b',
        width: 200,
        alignSelf: 'center',
        padding:15,
        borderRadius: 7,
        marginTop: 0,
        marginBottom: 20,
    },
    completeButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: "center"
    },
    noOrderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 22,
        marginTop: 20,
    },
});

export default YourOrderScreen;
