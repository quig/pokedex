import React, { Component } from 'react'
import { View } from 'react-native'
import { Badge, Text } from 'react-native-elements'
const Type = ({ types }) => {
    const colorTypeMap = {
        fire: '#ff4d26',
        water: '#3aa4ff',
        grass: '#82d35f',
        electric: '#ffd33a',
        flying: '#93a4ff',
        normal: '#b3b3a3',
        psychic: '#ff60a3',
        ice: '#71d2ff',
        bug: '#b3c326',
        rock: '#c3b371',
        ground: '#e1c35f',
        fairy: '#f0a3f0',
        poison: '#b35fa3',
        fighting: '#c3604d',
        ghost: '#7171c3',
        steel: '#b3b3c3',
        dark: '#825f4d',
        dragon: '#8271f0',
    }

    return (
        <View
            style={{
                flexDirection: 'row',
            }}
        >
            {types.map(type => (
                <Badge
                    key={type}
                    containerStyle={{
                        backgroundColor: colorTypeMap[type]
                            ? colorTypeMap[type]
                            : 'white',
                    }}
                >
                    <Text style={{ textAlign: 'center' }}>{type}</Text>
                </Badge>
            ))}
        </View>
    )
}

export default Type
