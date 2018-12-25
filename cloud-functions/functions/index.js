'use strict'

const functions = require('firebase-functions')

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient()

const pokemonList = require('./pokemon.list.js')

exports.analysePokemonHttp = functions.https.onCall(data => {
    const uri = data.uri
    return client
        .webDetection(uri)
        .then(results => {
            const bestGuessLabels = results[0].webDetection.bestGuessLabels
            if (bestGuessLabels && bestGuessLabels.length >= 1) {
                let bestGuess = bestGuessLabels[0].label.toLowerCase()
                for (const pokemon of pokemonList) {
                    if (bestGuess.includes(pokemon)) return { guess: pokemon }
                }
            }
            return { guess: 'unown' }
        })
        .catch(err => {
            throw new functions.https.HttpsError(
                'Error while fetching information about the pokemon',
                err,
            )
        })
})
