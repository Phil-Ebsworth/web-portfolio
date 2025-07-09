import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const NameChangeModal = ({ showModal, currentName, onClose, onSave }: { showModal: boolean, currentName: string, onClose: () => void, onSave: (newName: string) => void }) => {
    const [newName, setNewName] = useState(currentName);

    if (!showModal) return null;

    const handleSave = () => {
        onSave(newName);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="rounded-xl shadow-lg p-6 max-w-md w-full">
                <h3 className="text-center text-lg font-semibold mb-4">Ändere deinen Namen</h3>
                <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} className="p-2 rounded-md">Abbrechen</Button>
                    <Button onClick={handleSave} className="p-2 rounded-md">Speichern</Button>
                </div>
            </div>
        </div>
    );
};