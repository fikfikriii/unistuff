import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/512/3771/3771417.png",
      name: "Books",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/512/1785/1785348.png",
      name: "Fashion",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/512/1260/1260370.png",
      name: "Gadget",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/512/2806/2806045.png",
      name: "Tools",
    },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        Products Available
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            style={{
              margin: 10,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 7,
            }}
            key={index}
          >
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70 }}
            />

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

// const styles = StyleSheet.create({})
