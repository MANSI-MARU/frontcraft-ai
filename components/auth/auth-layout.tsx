export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-4">
            {children}
        </div>
    );
}