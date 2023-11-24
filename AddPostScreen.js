// AddPostScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddPostScreen = ({ navigation }) => {
    const [newPost, setNewPost] = useState({
        id: '',
        title: '',
        body: '',
        userId: 1
    });

    const savePost = async () => {
        try {
            // Fetch existing posts from local storage
            const existingPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];

            // Add the new post
            const updatedPosts = [...existingPosts, { ...newPost, id: Date.now() }];

            // Save the updated posts to local storage
            await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));

            // Navigate back to the feed screen
            navigation.goBack();
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* <TextInput
        style={styles.postInput}
        placeholder="Enter post ID"
        onChangeText={text => setNewPost({ ...newPost, id: text })}
      /> */}
            <TextInput
                style={styles.postInput}
                placeholder="Enter post title"
                onChangeText={text => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
                style={styles.postInput}
                placeholder="Enter post body"
                multiline
                onChangeText={text => setNewPost({ ...newPost, body: text })}
            />
            <Button
                title="Save Post"
                onPress={savePost}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
});

export default AddPostScreen;
