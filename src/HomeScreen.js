import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import {
    Header,
    Text,
    Button,
    List,
    ListItem,
    Icon,
    SearchBar,
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
    state = {
        loading: false,
        pokeList: pokemon_list,
    }

    searchFilterFunction = text => {
        const filteredList = pokemon_list.filter(item => {
            const name = item.name.toUpperCase()
            const input = text.toUpperCase()
            return name.indexOf(input) > -1
        })
        this.setState({
            pokeList: filteredList,
        })
    }

    renderRow = ({ item }) => (
        <ListItem
            roundAvatar
            avatar={item.image}
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
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.pokeList}
                    renderItem={this.renderRow}
                    keyExtractor={item => `${item.id}`}
                    ListHeaderComponent={
                        <SearchBar
                            placeholder="Search"
                            lightTheme
                            onChangeText={text =>
                                this.searchFilterFunction(text)
                            }
                            autoCorrect={false}
                        />
                    }
                />
            </List>
        )
    }
}
