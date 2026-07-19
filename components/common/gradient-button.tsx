type GradientButtonProps = {
    children: React.ReactNode;
};

export default function GradientButton({
    children,
}: GradientButtonProps) {
    return (
        <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white transition hover:scale-105">
            {children}
        </button>
    );
}