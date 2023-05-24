import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    Image,
} from "react-native";
import {
    addToCart,
    decrementQuantity,
    incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CarouselDetails from "../components/CarouselDetails";
// import { MaterialIcons } from "@expo/vector-icons";
// import Amenities from "../components/Amenities";

const ProductDetail = () => {

    const services = [
        {
            id: "0",
            name: "tes",
        },
    ]
    const route = useRoute();
    const item = route.params.item
    const currQuantity = 0;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const addItemToCart = () => {
        dispatch(addToCart(item)); // cart
        dispatch(incrementQty(item)); // product
    };

    return (
        <>
            <SafeAreaView
                style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
                <ScrollView>
                    {/* Image Carousel */}
                    <CarouselDetails />

                    <View
                        style={{
                            marginHorizontal: 12,
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                                {route.params.item.name}
                            </Text>
                        </View>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginHorizontal: 12,
                            marginTop: 4,
                            gap: 8,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            Rp {route.params.item.price}
                        </Text>

                    </View>
                    <View style={{ padding: 10, marginTop: 14 }}>
                        <Text style={{ fontSize: 17, fontWeight: "600" }}>
                            Category
                        </Text>
                        <View
                            style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
                        >
                            {services.map((item, index) => (
                                <View
                                    style={{
                                        margin: 10,
                                        backgroundColor: "#088F8F",
                                        paddingHorizontal: 11,
                                        paddingVertical: 5,
                                        borderRadius: 25,
                                        marginLeft: -2
                                    }}
                                    key={index}
                                >
                                    <Text style={{ textAlign: "center", color: "white" }}>{route.params.item.category}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View
                        style={{
                            margin: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 60,
                        }}
                    >
                        <View>
                            <Text
                                style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}
                            >
                                Description
                            </Text>
                            <Text
                                style={{ fontSize: 13 }}
                            >
                                {route.params.item.description}
                            </Text>
                        </View>

                    </View>

                    {cart.some((c) => c.id === route.params.item.id) ? (
                        <Pressable
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    dispatch(decrementQuantity(route.params.item)); // cart
                                    // dispatch(curr -1)
                                    dispatch(decrementQty(route.params.item)); // product
                                }}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    marginTop: 138,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#088F8F",
                                        paddingHorizontal: 6,
                                        fontWeight: "600",
                                        textAlign: "center",
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>

                            <Pressable>
                                <Text
                                    style={{
                                        fontSize: 34,
                                        color: "#088F8F",
                                        paddingHorizontal: 1,
                                        fontWeight: "800",
                                        marginTop: 130,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        
                                    }}
                                >
                                    {route.params.item.quantity}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    dispatch(incrementQuantity(route.params.item)); // cart
                                    // dispatch(curr + 1)
                                    dispatch(incrementQty(route.params.item)); //product
                                }}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    marginTop: 138,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#088F8F",
                                        paddingHorizontal: 6,
                                        fontWeight: "600",
                                        textAlign: "center",
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    ) : (
                        <Pressable
                            onPress={() => {
                                dispatch(addToCart(route.params.item));
                                dispatch(incrementQty(route.params.item));
                            }}
                            style={{
                                width: 200,
                                backgroundColor: "#088F8F",
                                borderColor: "gray",
                                borderRadius: 4,
                                borderWidth: 0.8,
                                padding: 15,
                                borderRadius: 7,
                                marginTop: 130,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: "white"
                                }}>Add to Cart</Text>
                        </Pressable>

                    )}

                </ScrollView>
            </SafeAreaView>

        </>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({});
