import prisma from "../lib/prisma";
import bcrypt from "bcrypt";


const SALT_ROUNDS = 12;

interface Credentials {
    email: string;
    password: string;
    name: string;
    role: string;
}

async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function authenticateUser(credentials: Credentials) {
    const user = await findUserByEmail(credentials.email);

    if (!user) {
        throw new Error("Invalid email or password"); // Avoid hinting which field is wrong
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return user;
}

export async function registerUser(credentials: Credentials) {
    const existingUser = await findUserByEmail(credentials.email);

    if (existingUser) {
        throw new Error("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(credentials.password, SALT_ROUNDS);

    return await prisma.user.create({
        data: {
            email: credentials.email,
            passwordHash,
            role: credentials.role,
            name: credentials.name
        }
    });
}