import * as React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import { Platform } from "expo-modules-core";

export default class PickImage extends React.Component {
  state = {
    image: null,
  };
    
    componentDidMount() {
        this.getPermissionAsync();
    }

    uploadImage = async () => {
        console.log("here it is!")
    }

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                this.setState({
                    image: result.data
                });
                console.log(result.uri)
                this.uploadImage(result.uri)
            }
         
        } catch (E) {
            console.log(E)
     }  
    }
    
    getPermissionAsync = async () => {
        if (Platform.OS != 'web') {
            const { status } = await Permission.askAsync(Permission.CAMERA_ROLL);
            if (status !== 'granted') {
                Alert.alert('Sorry we need camera permission to make this work')
            }
        }
    }

  render() {
    //this.state.image
    let { image } = this.state;
      return (
          <View style={styles.container}>
              <Button
              title = "Magic"
              onPress={this.pickImage}
              />
          </View>
      
      )
  }
}

var styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        flex : 1 ,
        alignItems : 'center'
    }
})