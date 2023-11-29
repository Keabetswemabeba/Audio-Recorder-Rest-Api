import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Text, View, TextInput, Alert, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const apiKey = "AIzaSyDptvaUua6VqONYXCfZANWIoaon5ytcsoo";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        const endPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        const userInfo = {
            email,
            password,
            returnSecureToken: true
        }

        try {
            const response = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });

            // Handle successful signup
            Alert.alert("Success", "Signed Up Successfully.", [{ text: "OK" }]);
            console.log("Signed Up Successfully.");
            navigation.navigate('SignIn');
        } catch (error) {
            // Handle signup error
            Alert.alert("Error", "Failed to sign up!", [{ text: "OK" }]);
            console.log("Failed to sign up!", error);
        }
    }

    const handleLinkClick = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Sign Up" subtitle="Enter Email and Password to sign up" />
                <Card.Content>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.inputs}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.inputs}
                    />
                </Card.Content>
                <Card.Actions>
                    <TouchableOpacity onPress={handleSignup} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </Card.Actions>
                <Card.Actions>
                    <TouchableOpacity style={styles.nav_link} onPress={handleLinkClick}>
                        <Text style={styles.nav_linkText}>Already have an account? Sign in</Text>
                    </TouchableOpacity>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#whitesmoke',
    },
    card: {
        marginTop: 15,
        marginBottom: 15,
        height: 500,
        width: 300,
        backgroundColor: 'wheat',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nav_linkText: {
        color: '#4a4a4a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputs: {
        width: 250,
        height: 30,
        backgroundColor: '#gray',
        height: 40,
        borderColor: '#4a4a4a',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    labels: {
        color: "#pink",
    },
});

export default SignUp;
