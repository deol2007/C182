/**
 * The `Filter1` function takes in face data and renders a pair of glasses on the face using React
 * Native components.
 * @returns The code is returning a React component called `Filter1`. This component renders a View
 * component with an Image component inside it. The View component has a position of 'absolute' and is
 * positioned based on the coordinates of the LEFT_EYE. The Image component has a source of
 * '../assets/glasses.png' and is styled with a width and height based on the faceWidth and faceHeight
 * variables. The
 */
import React from 'react';
import { Image, View } from 'react-native';

/**
 * The Filter1 function takes in face data and renders a pair of glasses on the face.
 * @returns The code is returning a View component with an Image component inside it. The View
 * component has a position of 'absolute' and is positioned based on the coordinates of the LEFT_EYE.
 * The Image component has a source of '../assets/glasses.png' and is styled with a width and height
 * based on the faceWidth and faceHeight variables. The Image component also has a resizeMode of
 * 'contain' and
 */

/* The code is defining a function component called `Filter1` that takes in an object as a parameter.
The object has a property called `face` which contains nested properties `bounds`, `LEFT_EYE`, and
`RIGHT_EYE`. */
const Filter1 = ({
	face: {
		bounds: {
			size: { width: faceWidth, height: faceHeight },
		},
		LEFT_EYE,
		RIGHT_EYE,
	},
}) => 
/* The code is defining a React component called `Filter1`. This component takes in a `face`
object as a prop, which contains information about the face, such as its size and the
coordinates of the left and right eye. */
{
	/* The code `const glassesWidth = faceWidth; const glassesHeight = faceHeight / 3;` is calculating the
	width and height of the glasses based on the width and height of the face. */
	const glassesWidth = faceWidth;
	const glassesHeight = faceHeight / 3;

	
	/**
	 * The function `transformAngle` calculates the angle in degrees between two points representing the
	 * positions of the left and right eyes.
	 * @param [angleRad] - The parameter `angleRad` represents the angle in radians.
	 */
	const transformAngle = (angleRad = Math.atan((RIGHT_EYE.y - LEFT_EYE.y) / (RIGHT_EYE.x - LEFT_EYE.x))) => (angleRad * 180) / Math.PI;

	/* The `return` statement is returning a JSX code block that renders a `View` component with an
	`Image` component inside it. */
	return (
		<View
			style={{
				position: 'absolute',
				left: LEFT_EYE.x - glassesWidth * 0.675,
				top: LEFT_EYE.y - glassesHeight * 0.5,
			}}>
			<Image
				source={require('../assets/glasses.png')}
				style={{
					width: glassesWidth,
					height: glassesHeight,
					resizeMode: 'contain',
					/* The `transform` property in the `style` object of the `Image` component
					is applying a rotation transformation to the image. The
					`transformAngle()` function calculates the angle in degrees between the
					left and right eyes, and `${transformAngle()}deg` converts the angle to a
					string with the "deg" unit. The rotation transformation is then applied
					to the image using the `rotate` property of the `transform` array. */
					transform: [{ rotate: `${transformAngle()}deg` }],
				}}
			/>
		</View>
	);
};

/* The `export default Filter1;` statement is exporting the `Filter1` component as the default export
of the module. This means that when another module imports this module, they can import the
`Filter1` component directly without having to specify its name. For example, in another module, you
can import the `Filter1` component like this: `import Filter1 from './Filter1';`. */
export default Filter1;
