import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Image,
} from "react-native";
import React from "react";
import UniItem from "../components/UniItem";

const CategoryResults = ({ data, input }) => {
    return (
        <View >
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item.category.toLowerCase() === input.toLowerCase()) {
                        return (
                            <UniItem item={item}/>
                        )
                    }
                }}
            />
        </View>
    );
};

export default CategoryResults;

const styles = StyleSheet.create({});