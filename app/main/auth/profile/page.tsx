'use client';

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { set } from "zod";

const ProfilePage = () => {
    const { data: session, update } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [iconList, setIconList] = useState<string[]>([]);
    const [loadingIcons, setLoadingIcons] = useState(false);
    const [icon, setIcon] = useState<string>(session?.user.image || "/icons/star.png");
    const [iconSet, setIconSet] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    // Fetch available icons and set the current icon
    const fetchIcons = async () => {
        setLoadingIcons(true);
        try {
            const icons = (require as any).context(
                "../../../../public/icons",
                false,
                /\.(png|jpe?g|svg|gif)$/
            );
            const iconPaths: string[] = icons.keys().map((key: string) => `/icons/${key.replace('./', '')}`);
            setIconList(iconPaths);
        } catch (err) {
            setIconList([ // Fallback icons
                "/icons/star.png",
                "/icons/rocket.png",
                "/icons/heart.png",
                "/icons/smile.png",
                "/icons/cat.png",
            ]);
        }
        setLoadingIcons(false);
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
            })
    };

    const updateName = async (newName: string) => {
        await update({
            user: {
                ...session?.user,
                name: newName,
            },
        });
    }

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

            // Update the session and local icon state
            await updateIcon(newIcon);
            setIcon(newIcon);
            setShowModal(false); 
        } catch (err) {
            console.error("Netzwerkfehler:", err);
            alert("Network error occurred!");
        }
    };

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setShowModal(false);
        }
    };

    if (showModal) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [showModal]);

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <img
                    key={session?.user.image} // This key change forces a re-render when the icon changes
                    src={session?.user.image || "/icons/star.png"}
                    alt="Profilbild"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 object-cover cursor-pointer"
                    onClick={openModal}
                />
                <h1 className="text-3xl font-bold">{session?.user.name}</h1>
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div ref={modalRef} className="rounded-xl shadow-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Wähle ein neues Icon</h3>
                        {loadingIcons ? (
                            <p>Lade Icons...</p>
                        ) : (
                            <div className="grid grid-cols-6 gap-2">
                                {iconList.map((src) => (
                                    <button
                                        key={src}
                                        onClick={() => handleIconSelect(src)}
                                        className="rounded-lg"
                                    >
                                        <Image
                                            src={src}
                                            alt="Icon"
                                            width={64}
                                            height={64}
                                            className="rounded transition-transform duration-150 hover:scale-110"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default ProfilePage;
