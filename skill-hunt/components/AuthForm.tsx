"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface AuthFormProps {
    isSignUp: boolean; // true for signup, false for signin
}


const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(isSignUp ? "" : undefined);
    const [role, setRole] = useState(isSignUp ? "" : undefined);
    const session = useSession()

    const handleEmailSignIn = async () => {
        console.log("Sending request ------------");
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            name,
            role,
            isLogin: !isSignUp,
        });
        console.log("Request Processed ------------");
        if (res?.error) {
            console.log("Email sign-in error:", res.error);
        } else {
            router.push("/user");
        }
    };

    if (session.data?.user) {
        router.push('/user')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </h2>
                <form className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                    )}
                    {isSignUp && (
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                                type="text"
                                id="role"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </div>
                        
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                        onClick={handleEmailSignIn}
                    >
                        {isSignUp ? "Signup with Email" : "Login with Email"}
                    </button>
                </form>
                <div className="my-4 text-center text-black">or</div>
                <div className="flex flex-col space-y-2">
                    <div className="text-black flex items-center pt-1 ml-12">
                        {isSignUp ? (
                            <>Already have an account? <a className="underline font-bold pl-1" href="/signin">Signin</a></>
                        ) : (
                            <>Don't have an account? <a className="underline font-bold pl-1" href="/signup">Signup</a></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;