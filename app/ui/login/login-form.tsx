'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Separator } from "@/components/ui/separator";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await signIn('credentials', {
            username,
            password,
            redirect: true,
            callbackUrl: '/main',
        }) as { error?: string } | undefined;

        if (res?.error) {
            setError('Login fehlgeschlagen - Überprüfen Sie Ihre Anmeldedaten');
        } else {
            location.reload();
        }
    };

    const handleGuestLogin = async () => {
        const res = await signIn('credentials', {
            username: 'Gast',
            password: 'Gast',
            redirect: false,
        }) as { error?: string } | undefined;

        if (res?.error) {
            setError('Gast-Login fehlgeschlagen');
        } else {
            location.reload();
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your Username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="Benutzername"
                                    type="Text"
                                    placeholder="Benutzername"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/main/auth/register" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                        <Separator
                            orientation="horizontal"
                            className="mt-4 bg-gray-400"
                        />
                        <div className="flex justify-center mt-4">
                            <span className="text-center">
                                oder
                            </span>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full" onClick={handleGuestLogin}>
                                Als Gast spielen
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
