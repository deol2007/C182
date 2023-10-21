/* The above class is a React component that uses the Expo Camera and FaceDetector APIs to detect faces
in real-time and apply filters to them. */

/* The code is importing various modules and components from the React and React Native libraries. */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

import * as Permissions from "expo-permissions";

/* These lines of code are importing the `FaceDetector` and `Camera` components from the
`expo-face-detector` and `expo-camera` libraries, respectively. */
import * as FaceDetector from "expo-face-detector";
import { Camera } from "expo-camera";

/* The code is importing two components named `Filter1` and `Filter2` from separate files. These
components are likely filters that can be applied to the detected faces in the camera view. */
import Filter1 from "./Filter1";
import Filter2 from "./Filter2";

export default class Main extends React.Component {
  /**
   * The constructor initializes the state with camera permission and an empty array for detected faces,
   * and binds the necessary functions.
   * @param props - The "props" parameter in the constructor is used to pass data from a parent
   * component to the current component. It is an object that contains properties and values that can be
   * accessed within the component. In this case, the "props" parameter is being passed to the super
   * constructor, which is the constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
    };
   /* These lines of code are binding the `this` keyword to the respective functions
   `onCameraPermission`, `onFacesDetected`, and `onFaceDetectionError`. */
    this.onCameraPermission = this.onCameraPermission.bind(this);
    this.onFacesDetected = this.onFacesDetected.bind(this);
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
  }

  /**
   * The componentDidMount function asks for camera permission and then calls the onCameraPermission
   * function.
   */
  componentDidMount() {
   /* The line `Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);` is requesting
   camera permission from the user using the `askAsync` method from the `expo-permissions` module. */
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }

  /**
   * The function updates the state of a component based on the status of camera permission.
   */
  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === "granted" });
  }

  /**
   * The function updates the state of a component with the detected faces.
   */
  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  /**
   * The function logs the error message when there is an error in face detection.
   * @param error - The error parameter is the error object that is thrown when there is an error in the
   * face detection process.
   */
  onFaceDetectionError(error) {
    console.log(error);
  }

  /**
   * The render function checks for camera permission and renders different views based on the permission
   * status.
   * @returns The render method is returning a View component with different conditional rendering based
   * on the value of the hasCameraPermission state. If hasCameraPermission is null, it returns an empty
   * View. If hasCameraPermission is false, it returns a View with a Text component displaying "No access
   * to camera". Otherwise, it returns a View with a SafeAreaView, a heading container with a Text
   * component displaying "FRAPP
   */
  render() {
    const { hasCameraPermission } = this.state;
    /* The code `if (hasCameraPermission === null) {
		  return <View />;
		}` is checking if the `hasCameraPermission` state is `null`. If it is `null`, it means that
	the camera permission has not been determined yet. In this case, the code returns an empty
	`<View />` component, which means that nothing will be rendered on the screen until the camera
	permission is determined. */
    if (hasCameraPermission === null) {
      return <View />;
    }
    /* The code block `if (hasCameraPermission === false)` is checking if the `hasCameraPermission`
   state is `false`. If it is `false`, it means that the user has denied access to the camera. In
   this case, the code returns a View component with a Text component displaying "No access to
   camera". This is a fallback view that is displayed when the user does not grant permission to
   access the camera. */
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }

    /* The `return` statement is returning a JSX code block that will be rendered as a view in the
	React Native application. */
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>FRAPP</Text>
        </View>

        <View style={styles.cameraStyle}>
         
		  {/* The `<Camera>` component is rendering a camera view in the React Native application. It has
		 several props that configure its behavior: */}
          <Camera
           /* The `style={{ flex: 1 }}` is setting the flex property of the Camera component to 1. */
		    style={{ flex: 1 }}
           /* The `type={Camera.Constants.Type.front}` prop is setting the type of camera to be used in
		   the `<Camera>` component. In this case, it is setting the camera to the front-facing
		   camera of the device. By default, the `type` prop is set to `back`, which uses the
		   rear-facing camera. */
		    type={Camera.Constants.Type.front}
            /* The `faceDetectorSettings` prop is configuring the settings for the face detection
			algorithm used by the `Camera` component. */
			faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
            }}
           /* The `onFacesDetected={this.onFacesDetected}` is assigning the `onFacesDetected` function
		   defined in the `Main` class as the event handler for the `onFacesDetected` event of the
		   `Camera` component. */
		    onFacesDetected={this.onFacesDetected}
           /* The line `onFacesDetectionError={this.onFacesDetectionError}` is assigning the
		   `onFacesDetectionError` function defined in the `Main` class as the event handler for the
		   `onFacesDetectionError` event of the `Camera` component. This function is called when
		   there is an error in the face detection process. */
		    onFacesDetectionError={this.onFacesDetectionError}
          />

          {/* The code `{this.state.faces.map((face) => {
			return <Filter1 key={face.faceID} face={face} />;
		  })}` is mapping over the `faces` array in the component's state and rendering a
		  `<Filter1>` component for each face detected in the camera view. */}
          {this.state.faces.map((face) => {
            /* The line `return <Filter1 key={face.faceID} face={face} />;` is rendering a `<Filter1>`
			component for each face detected in the camera view. */
			return <Filter1 key={face.faceID} face={face} />;
          })}
        </View>
      </View>
    );
  }
}

/* The `const styles` variable is an object that contains a set of styles defined using the
`StyleSheet.create()` method. Each key-value pair in the object represents a specific style rule. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
  },
  cameraStyle: {
    flex: 0.65,
  },
});
