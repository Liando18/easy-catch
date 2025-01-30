import React, { useState, useEffect } from "react";

const BtnApp = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isInPwaMode, setIsInPwaMode] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInPwaMode(true);
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            console.log("User choice:", choiceResult.outcome);

            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
                setIsInstalled(true);
                alert("Aplikasi telah berhasil diinstal.");
            } else {
                console.log("User dismissed the A2HS prompt");
            }

            setDeferredPrompt(null);
        } else {
            alert("Aplikasi sudah terinstal di perangkat Anda.");
        }
    };

    if (isInPwaMode) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-full border border-white hover:text-gray-950 hover:bg-white focus:ring-4 focus:ring-gray-400 transition-all duration-300"
        >
            {isInstalled ? "Aplikasi Terinstal" : "Install App"}
        </button>
    );
};

export default BtnApp;
