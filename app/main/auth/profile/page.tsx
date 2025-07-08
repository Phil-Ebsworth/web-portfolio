'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IconPickerModal from "./IconPickerModal";

const ProfilePage = () => {
    const { data: session, update } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [iconList, setIconList] = useState<string[]>([]);
    const [loadingIcons, setLoadingIcons] = useState(false);
    const [icon, setIcon] = useState<string>(session?.user.image || "/icons/star.png");

    const fetchIcons = async () => {
        setLoadingIcons(true);
        try {
            const icons = (require as any).context(
                "../../../../public/icons",
                false,
                /\.(png|jpe?g|svg|gif)$/
            );
            const paths: string[] = icons.keys().map((key: string) => `/icons/${key.replace('./', '')}`);
            setIconList(paths);
        } catch {
            setIconList([
                "/icons/star.png",
                "/icons/rocket.png",
                "/icons/heart.png",
                "/icons/smile.png",
                "/icons/cat.png",
            ]);
        } finally {
            setLoadingIcons(false);
        }
    };

    const openModal = () => {
        fetchIcons();
        setShowModal(true);
    };

    const updateIcon = async (newIcon: string) => {
        await update({
            user: {
                ...session?.user,
                image: newIcon,
            },
        });
    };

    const handleIconSelect = async (newIcon: string) => {
        try {
            const res = await fetch(`/api/user/${session?.user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: newIcon }),
            });

            const responseBody = await res.json();

            if (!res.ok) {
                console.error("Fehler beim Speichern:", responseBody);
                alert(responseBody.error || "Unknown error");
                return;
            }

            await updateIcon(newIcon);
            setIcon(newIcon);
            setShowModal(false);
        } catch (err) {
            console.error("Netzwerkfehler:", err);
            alert("Network error occurred!");
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex flex-col items-center text-center">
                <img
                    key={session?.user.image}
                    src={session?.user.image || "/icons/star.png"}
                    alt="Profilbild"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 object-cover cursor-pointer"
                    onClick={openModal}
                />
                <h1 className="text-3xl font-bold">{session?.user.name}</h1>
            </div>

            {showModal && (
                <IconPickerModal
                    iconList={iconList}
                    loading={loadingIcons}
                    onSelect={handleIconSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </main>
    );
};

export default ProfilePage;
