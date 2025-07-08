'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";

interface IconPickerModalProps {
    iconList: string[];
    loading: boolean;
    onSelect: (src: string) => void;
    onClose: () => void;
}

const IconPickerModal = ({ iconList, loading, onSelect, onClose }: IconPickerModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
            <div ref={modalRef} className="rounded-xl shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Wähle ein neues Icon</h3>
                {loading ? (
                    <p>Lade Icons...</p>
                ) : (
                    <div className="grid grid-cols-6 gap-2">
                        {iconList.map((src) => (
                            <button
                                key={src}
                                onClick={() => onSelect(src)}
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
    );
};

export default IconPickerModal;
