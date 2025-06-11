import React from "react";

const SettingsPage: React.FC = () => {
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Profile</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border rounded px-3 py-2"
                            placeholder="you@example.com"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-2">Account</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Delete Account
                </button>
            </section>
        </main>
    );
};

export default SettingsPage;