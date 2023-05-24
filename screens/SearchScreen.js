import { StyleSheet, ScrollView, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";

const SearchScreen = () => {
    const [input, setInput] = useState("");
    const data = useSelector((state) => state.product.product);
    console.log("Ini data name");
    console.log(data.name);
    const dispatch = useDispatch();
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
    console.log("Ini items");
    console.log(items);
    return (
        <SafeAreaView>
            <View
                style={{
                    marginTop: 50,
                    padding: 10,
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#FFC72C",
                    borderWidth: 4,
                    borderRadius: 10,
                    marginTop :60,
                }}
            >
                <TextInput
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder="Enter Your Stuff"
                />
                <Feather name="search" size={22} color="black" />
            </View>
            <ScrollView>
                <SearchResults data={data} input={input} setInput={setInput} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({});
