import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './loadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
    }
}

class Directory extends Component {


    static navigationOptions = {
        title: 'Directory'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc ={{uri: baseUrl + item.image}}
                />
            );
        };


        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return(
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            )
        }
        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
            </Animatable.View>
        );
    }
}

export default connect(mapStateToProps)(Directory);