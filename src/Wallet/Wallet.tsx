import React, {useState} from "react";
import {Dimensions, StyleSheet } from "react-native";
import Card, { CARD_HEIGHT, Cards } from "../components/Card";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { interpolate, Extrapolate, add } from 'react-native-reanimated';
import { usePanGestureHandler, withDecay, diffClamp } from "react-native-redash";
const MARGIN = 16;
const styles = StyleSheet.create({
    card: {
      marginVertical: MARGIN,
      alignSelf: "center",
    },
    container : {
        flex: 1,
        backgroundColor:"#fff",
        alignItems: 'center'
    }
  });
const { height } = Dimensions.get("window");

const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const cards = [
  {
    index: 1,
    type: Cards.Card1,
  },
  {
    index: 2,
    type: Cards.Card2,
  },
  {
    index: 3,
    type: Cards.Card3,
  },
  {
    index: 4,
    type: Cards.Card4,
  },
  {
    index: 5,
    type: Cards.Card5,
  },
  {
    index: 7,
    type: Cards.Card6,
  },
];

const Wallet = () => {
    const [containerHeight, setContainerHeight] = useState(height);
    const visibleCards = Math.floor(containerHeight / HEIGHT);
    const {
        gestureHandler,
        translation,
        velocity,
        state
    } = usePanGestureHandler();
    const y = diffClamp(withDecay({
        value: translation.y,
        velocity: velocity.y,
        state
    }), -HEIGHT * cards.length + visibleCards * HEIGHT , 0)
  return (
    <PanGestureHandler {...gestureHandler}>
        <Animated.View style={styles.container} onLayout={({
          nativeEvent: {
            layout: {height: h}
          }
        }) => setContainerHeight(h)}>
            {cards.map(({ type } , index) => {
                const positionY = add(y, index * HEIGHT);
                const isDisappearing = -HEIGHT;
                const isTop = 0;
                const isBottom = HEIGHT * (visibleCards -1);
                const isAppearing = HEIGHT * visibleCards;
                const translateYWithScale = interpolate(positionY, {
                  inputRange: [isBottom, isAppearing],
                  outputRange: [0, -HEIGHT / 4],
                  extrapolate: Extrapolate.CLAMP
                });

                const translateY = add(interpolate(y, {
                  inputRange: [-HEIGHT * index, 0],
                  outputRange: [-HEIGHT*index, 0],
                  extrapolate: Extrapolate.CLAMP
                }), translateYWithScale);

                const scale = interpolate(positionY, {
                  inputRange: [isDisappearing, isTop, isBottom, isAppearing],
                  outputRange: [0.5, 1, 1, 0.5],
                  extrapolate: Extrapolate.CLAMP
                });

                const opacity = interpolate(positionY, {
                  inputRange: [isDisappearing, isTop, isBottom, isAppearing],
                  outputRange: [0, 1, 1, 0],
                  extrapolate: Extrapolate.CLAMP
                });

                return(
                    <Animated.View style={[styles.card,{opacity, transform: [{translateY}, {scale}]} ]} key={index}>
                        <Card {...{type}} />
                    </Animated.View>
                )
            })}
        </Animated.View>
    </PanGestureHandler>
  );
};

export default Wallet;