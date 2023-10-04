'use client'
import React from "react";
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../public/firebase';
import styles from './Page.module.css'; // Import the CSS module

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // If the user is not verified, send a verification email
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                alert('Verification email sent. Please check your email and verify.');
            } else {
                alert('Logged in successfully');
                // Redirect to dashboard or main page
                window.location.href = '/dashboard';
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleLogin}>
                <input
                    className={styles.inputField}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    className={styles.inputField}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className={styles.button} type="submit">Login</button>
            </form>
        </div>
    );
}
