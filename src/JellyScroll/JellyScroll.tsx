import React from "react";
import Animated, {
  useCode,
  startClock,
  set,
  divide,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  useValue,
  useClock,
  useDiff,
} from "react-native-redash";

import Card, { Cards } from "../components/Card";
import { useConst } from "../components";

const perspective = 600;
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

const JellyScroll = () => {
  const clock = useClock();
  const y = useValue(0);
  const velocity = useValue(0);
  const onScroll = useConst(() =>
    Animated.event([
      {
        nativeEvent: {
          contentOffset: { y },
        },
      },
    ])
  );
  const dy = useDiff(y);
  const dt = useDiff(clock);
  useCode(() => [startClock(clock), set(velocity, divide(dy, dt))], []);
  const skewY = interpolate(velocity, {
    inputRange: [-5, 0, 5],
    outputRange: [-Math.PI / 9, 0, Math.PI / 9],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.ScrollView
      scrollEventThrottle={1}
      {...{ onScroll }}
      showsVerticalScrollIndicator={false}
    >
      {cards.map(({ type }, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 45,
              transform: [{ perspective }, { skewY }],
            }}
          >
            <Card {...{ type }} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default JellyScroll;