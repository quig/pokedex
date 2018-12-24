import React, { Component } from 'react'
import { Button, Image, View } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

export default class PhotoScreen extends Component {
    state = {
        image: null,
    }

    render() {
        let { image } = this.state

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
            </View>
        )
    }

    _pickImage = async () => {
        try {
            const res = await Promise.all([
                Permissions.askAsync(Permissions.CAMERA),
                Permissions.askAsync(Permissions.CAMERA_ROLL),
            ])
            if (res.some(o => o.status === 'granted')) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                })

                console.log(result)

                if (!result.cancelled) {
                    this.setState({ image: result.uri })
                    /**
                     * send the image to firebase for analysis
                     */
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
