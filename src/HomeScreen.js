import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import {
    Header,
    Text,
    Button,
    List,
    ListItem,
    Icon,
} from 'react-native-elements'
import { pokemon_list } from './PokemonList'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pokedex',
            headerRight: (
                <Icon
                    onPress={() => navigation.navigate('Photo')}
                    name="photo-camera"
                    color="#fff"
                    size={40}
                />
            ),
        }
    }

    state = { pokeList: pokemon_list }

    renderRow = ({ item }) => (
        <ListItem
            roundAvatar
            avatar={item.avatar}
            key={item.id}
            onPress={() =>
                this.props.navigation.navigate('Details', {
                    pokemon: item,
                })
            }
            title={item.name}
        />
    )

    render() {
        return (
            <View style={{ flex: 1 }}>
                <List>
                    <FlatList
                        data={this.state.pokeList}
                        renderItem={this.renderRow}
                        keyExtractor={item => `${item.id}`}
                    />
                </List>
            </View>
        )
    }
}
