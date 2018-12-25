import React, { Component, Fragment } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import uuid from 'uuid'
import firebase from 'firebase'
import { pokemon_list } from './PokemonList'
require('firebase/functions')

export default class PhotoScreen extends Component {
    state = {
        image: null,
    }
    willFocus = this.props.navigation.addListener('willFocus', payload => {
        this.setState({ image: null })
    })

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
                {!image && (
                    <Fragment>
                        <Button
                            large
                            rounded
                            icon={{ name: 'photo-library' }}
                            backgroundColor="#23a0f5"
                            title="Choose the image from your library"
                            onPress={this._pickImage}
                            style={{ padding: 10 }}
                        />
                        <Button
                            large
                            rounded
                            icon={{ name: 'squirrel', type: 'octicon' }}
                            backgroundColor="#ff6126"
                            title="Or take a picture"
                            onPress={this._capturePhoto}
                            style={{ padding: 10 }}
                        />
                    </Fragment>
                )}
                {image && (
                    <Fragment>
                        <Image
                            source={{ uri: image }}
                            style={{ width: 200, height: 200 }}
                        />
                        <ActivityIndicator size="small" color="#f4511e" />
                    </Fragment>
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

    _analyseImage = async uri => {
        var addMessage = firebase
            .functions()
            .httpsCallable('analysePokemonHttp')
        try {
            const {
                data: { guess: pokemon_guessed },
            } = await addMessage({ uri: uri })

            return pokemon_guessed ? pokemon_guessed : 'unown'
        } catch (error) {
            console.log(error)
        }
    }

    _analyseAndRedirect = async () => {
        const fileUri = await this._uploadAsFile(this.state.image)
        const result = await this._analyseImage(fileUri)
        this.props.navigation.navigate('Details', {
            pokemon: pokemon_list.filter(pkmn => pkmn.name === result)[0],
        })
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
                    this._analyseAndRedirect()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    _capturePhoto = async () => {
        try {
            const res = await Promise.all([
                Permissions.askAsync(Permissions.CAMERA),
                Permissions.askAsync(Permissions.CAMERA_ROLL),
            ])
            if (res.some(o => o.status === 'granted')) {
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                })
                if (!result.cancelled) {
                    this.setState({ image: result.uri })
                    this._analyseAndRedirect()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
