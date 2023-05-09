import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DressItem from "../components/DressItem";

const SearchResults = ({ data, input, setInput }) => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item.name.toLowerCase().includes(input.toLowerCase())) {
                        if (input === "") {
                            return null;
                        }
                        return (
                            
                                <DressItem item={item} />
                            
                        )
                    }
                }}
            />
        </View>
    );
};

export default SearchResults;

const styles = StyleSheet.create({});
