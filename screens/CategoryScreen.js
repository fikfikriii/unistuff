import { StyleSheet, ScrollView, Text, FlatList, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import CategoryResults from "../components/CategoryResults";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";

const CategoryScreen = () => {
    const route = useRoute();
    const service = route.params.item
    const input = service.name
    const data = useSelector((state) => state.product.product);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length > 0) return;

        const fetchdatas = async () => {
            const colRef = collection(db, "types");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                items.push(doc.data());
            });
        };
        fetchdatas();
    }, [items]);
    return (
        <SafeAreaView
            style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
            <View
                style={{
                    marginHorizontal: 12,
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {service.name}
                </Text>
            </View>
            <ScrollView>
                <CategoryResults data={data} input={input} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({});