import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, TextInput } from 'react-native';
import styles from './styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const { height, width } = Dimensions.get('window');
  const imagePosition = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    // Image will pull up once button is clicked
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
  };

  const regiserHandler = () => {
    imagePosition.value = 0;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={(StyleSheet.absoluteFill, imageAnimatedStyle)}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height} />
          </ClipPath>
          <Image
            href={require('./assets/login-background.jpg')}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <View style={styles.closeButtonContainer}>
          <Text>X</Text>
        </View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={registerHandler}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
        {/* <View style={styles.formInputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
}
