import { motion } from "framer-motion";
import { User, Code2, Briefcase } from "lucide-react";

interface MobileNavProps {
    activeSection: string;
    onNavigate: (sectionId: string) => void;
    variant: "untested" | "tested";
}

const MobileNav = ({ activeSection, onNavigate, variant }: MobileNavProps) => {
    const isUntested = variant === "untested";

    const navItems = [
        { id: "about", icon: User, label: "About" },
        { id: "skills", icon: Code2, label: "Skills" },
        { id: "experience", icon: Briefcase, label: "Experience" },
    ];

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t backdrop-blur-md bg-background/80 safe-area-bottom ${isUntested ? "border-danger/20" : "border-success/20"
                }`}
        >
            <nav className="flex items-center justify-around h-16 px-4 pb-safe">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors relative ${isActive
                                ? isUntested ? "text-danger" : "text-success"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <div className="relative flex flex-col items-center justify-center mx-auto">
                                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </motion.div>
    );
};

export default MobileNav;
