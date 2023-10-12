'use client'
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import bcrypt from 'bcryptjs-react';
import { users } from '/db'; // Mock database


export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
    });
    //const { data: session } = useSession();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        const newUser = { ...formData, hashedPassword, id: Date.now() };

        // Add to mock database
        console.log('Users before:', users);
        users.push(newUser);
        console.log('Users After:', users);

        // Redirect to login or another page
    };

    const handleGoogleRegister = async () => {
        const user = await signIn('google', { redirect: false });
        if (user && !user.error) {
            // Prompt for address and add to our mock database
            const address = prompt('Please enter your address:');
            if (address) {
                const existingUser = users.find(u => u.email === user.email);
                if (existingUser) {
                    existingUser.address = address;
                } else {
                    users.push({ ...user, address, id: Date.now() });
                }
            }
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
            />
            <button type="submit">Register</button>
            <button type="button" onClick={handleGoogleRegister}>Register with Google</button>
        </form>
    );
}
