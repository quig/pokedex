import React, { Component } from 'react'
import { Button, Image, View } from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import uuid from 'uuid'
import firebase from 'firebase'

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
                    title="Choose the image you want to analyse"
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

    _uploadAsFile = async uri => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function() {
                resolve(xhr.response)
            }
            xhr.onerror = function(e) {
                reject(new TypeError('Network request failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)
            xhr.send(null)
        })

        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4())
        const snapshot = await ref.put(blob)
        blob.close()
        return await snapshot.ref.getDownloadURL()
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
                if (!result.cancelled) {
                    this.setState({ image: result.uri })
                    this._uploadAsFile(result.uri)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
