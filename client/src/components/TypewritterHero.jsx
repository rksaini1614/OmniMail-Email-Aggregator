import { useEffect, useState } from "react";

const lines = [
    "Welcome to OnmiMail!",
    "All Your Emails. One Unified Inbox.",
    "Bring all your emails under one roof.",
    "One inbox to rule them all.",
    "No more switching tabs.",
    "Smarter email. Simpler life.",
    "Link! Sync! Chill! Your Mails Are Here."
];

const TypewriterHero = () => {
    const [text, setText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentLine = lines[lineIndex];

        const typingSpeed = 150; 
        const deletingSpeed = 80;  
        const pauseBeforeDelete = 1000;
        const pauseBeforeTyping = 100;  

        let timeout;

        if (!isDeleting && charIndex === currentLine.length) {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
        // Pause before typing next
        timeout = setTimeout(() => {
            setIsDeleting(false);
            setLineIndex((prev) => (prev + 1) % lines.length);
        }, pauseBeforeTyping);
        } else {
        timeout = setTimeout(() => {
            const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setCharIndex(nextCharIndex);
            setText(currentLine.slice(0, nextCharIndex));
        }, isDeleting ? deletingSpeed : typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, lineIndex]);

    return (
        <h1 className="text-3xl sm:text-5xl bg-gradient-to-tr from-[#4E1A70] to-[#2B4CF2]
                    bg-clip-text text-transparent font-bold h-20">
        {text}
        <span className="animate-pulse">|</span>
        </h1>
    );
};

export default TypewriterHero;
