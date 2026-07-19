export default function AuthCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-8 shadow-2xl">
            {children}
        </div>
    );
}