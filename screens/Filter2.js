/**
 * The above code is a React component that renders a pair of round glasses on a face detected in an
 * image.
 * @returns The Filter2 component is being returned.
 */
import React from "react";
import { Image, View } from "react-native";

const Filter2 = ({
  /* The code `face: { bounds: { size: { width: faceWidth, height: faceHeight } }, LEFT_EYE, RIGHT_EYE
	}` is destructuring the `face` object and extracting the `bounds`, `LEFT_EYE`, and `RIGHT_EYE`
	properties from it. */
  face: {
    /* The code `bounds: { size: { width: faceWidth, height: faceHeight } }` is extracting the `width`
		and `height` properties from the `size` object within the `bounds` object. It is assigning the
		values of `width` and `height` to the variables `faceWidth` and `faceHeight`, respectively. */
    bounds: {
      size: { width: faceWidth, height: faceHeight },
    },
    LEFT_EYE,
    RIGHT_EYE,
  },
}) => {
  /* The code `const glassesWidth = faceWidth;` is assigning the value of `faceWidth` to the variable
	`glassesWidth`. This is done to set the width of the glasses to be the same as the width of the
	detected face. */
  const glassesWidth = faceWidth;
  const glassesHeight = faceHeight / 3;

  /**
   * The function `transformAngle` calculates the angle in degrees between the line connecting the left
   * and right eye coordinates and the x-axis.
   * @param [angleRad] - The `angleRad` parameter represents the angle in radians. It is calculated
   * using the `Math.atan` function, which calculates the arctangent of the ratio of the difference in
   * y-coordinates of the right and left eye positions to the difference in x-coordinates of the right
   * and left eye positions
   */
  const transformAngle = (
    angleRad = Math.atan(
      (RIGHT_EYE.y - LEFT_EYE.y) / (RIGHT_EYE.x - LEFT_EYE.x)
    )
  ) => (angleRad * 180) / Math.PI;

  /* The `return` statement is returning a JSX element that represents the component's rendered output. */
  return (
    <View
      style={{
        position: "absolute",
        left: LEFT_EYE.x - glassesWidth * 0.675,
        top: LEFT_EYE.y - glassesHeight * 0.5,
      }}
    >
      <Image
        source={require("../assets/glasses-round.png")}
        style={{
          width: glassesWidth,
          height: glassesHeight,
          resizeMode: "contain",
          transform: [{ rotate: `${transformAngle()}deg` }],
        }}
      />
    </View>
  );
};

/* `export default Filter2;` is exporting the `Filter2` component as the default export of the module.
This means that when another module imports this module, they can import it using any name they
choose. For example, they can import it as `import MyFilter from './Filter2'`. */
export default Filter2;
