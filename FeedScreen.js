// FeedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch posts from the API
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                AsyncStorage.getItem('posts')
                    .then(data => {
                        if (data) {
                            const localPosts = JSON.parse(data);
                            setPosts([...response.data, ...localPosts]);
                        } else {
                            setPosts(response.data)
                        }
                    })
                    .catch(error => {
                        setPosts(response.data)
                        console.error('Error fetching posts from local storage:', error)
                    });

            })
            .catch(error => console.error('Error fetching posts from API:', error));

        // Fetch locally saved posts
    }, []);

    const filteredPosts = posts.filter(post => post.title.includes(searchQuery));

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={text => setSearchQuery(text)}
            />
            <FlatList
                data={filteredPosts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                )}
            />
            <Button
                title="Add New Post"
                onPress={() => navigation.navigate('AddPost')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    postContainer: {
        marginBottom: 16,
    },
    postTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default FeedScreen;
