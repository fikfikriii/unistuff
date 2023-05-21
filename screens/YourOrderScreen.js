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
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';

const YourOrderScreen = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const currentUserUid = auth.currentUser.uid;
                const userDoc = await getDoc(doc(db, 'users', currentUserUid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const orders = userData.orders || {};

                    // Convert the orders map to an array
                    const orderArray = Object.values(orders);
                    setOrderHistory(orderArray);
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, []);

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
                    <Text style={styles.heading}>Your Order</Text>
                    <FlatList
                        data={orderHistory}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
                        <Text style={styles.completeButtonText}>Complete</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.noOrderText}>You Don't Have Any Ongoing Order</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
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
    completeButton: {
        backgroundColor: 'blue',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    completeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noOrderText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default YourOrderScreen;
