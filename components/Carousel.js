import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "http://drive.google.com/uc?export=view&id=12ZcQyXOx48-LYxvZj3PhuomIeqWeydbj",
    "http://drive.google.com/uc?export=view&id=12b0bxC5eko0eItj28MQOx8-AFYtmDVeE",
    "http://drive.google.com/uc?export=view&id=12iMiEUVgZe-P-o5edxt-dOe-m3Td7jPw"
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});

