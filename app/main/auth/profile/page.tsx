'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IconPickerModal from "./IconPickerModal";
import { NameChangeModal } from "./NameChangeModal";
import { WTLBoard } from "./wtl-board";


const ProfilePage = () => {
    const { data: session, update } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false); // State for name modal
    const [iconList, setIconList] = useState<string[]>([]);
    const [loadingIcons, setLoadingIcons] = useState(false);

    const fetchIcons = async () => {
  setLoadingIcons(true);
  try {
    const icons = (require as any).context(
      "../../../../public/icons",
      false,
      /^\.\/.+\.(png|jpe?g|svg|gif)$/i
    );
    const paths: string[] = icons.keys()
      .filter((key: string) => key && key.startsWith('./'))
      .map((key: string) => `/icons/${key.replace('./', '')}`);
    setIconList(paths);
  } catch (err) {
    console.error("Fehler beim Laden der Icons:", err);
    setIconList([]);
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
            setShowModal(false);
        } catch (err) {
            console.error("Netzwerkfehler:", err);
            alert("Network error occurred!");
        }
    };

    const handleNameChange = async (newName: string) => {
        try {
            const res = await fetch(`/api/user/${session?.user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName }),
            });

            const responseBody = await res.json();

            if (!res.ok) {
                console.error("Fehler beim Speichern:", responseBody);
                alert(responseBody.error || "Unknown error");
                return;
            }

            await update({
                user: {
                    ...session?.user,
                    name: newName,
                },
            });
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
                    src={session?.user.image}
                    alt="Profilbild"
                    className="w-32 h-32 rounded-full shadow-lg mb-4 object-cover cursor-pointer"
                    onClick={openModal}
                />
                <h1 
                    className="text-3xl font-bold cursor-pointer"
                    onClick={() => setShowNameModal(true)} // Open name change modal
                >
                    {session?.user.name}
                </h1>
            </div>

            {/* Icon Picker Modal */}
            <IconPickerModal
                showModal={showModal}
                iconList={iconList}
                loading={loadingIcons}
                onSelect={handleIconSelect}
                onClose={() => setShowModal(false)}
            />

            {/* Name Change Modal */}
            <NameChangeModal
                showModal={showNameModal}
                currentName={session?.user.name || ''}
                onClose={() => setShowNameModal(false)}
                onSave={handleNameChange}
            />

            {/* WTL Board */}
            <WTLBoard
                wins={session?.user.wins || 0}
                losses={session?.user.losses || 0}
                ties={session?.user.ties || 0}
            />
        </main>
    );
};

export default ProfilePage;
