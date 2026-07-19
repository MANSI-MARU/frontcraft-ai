export default function SocialLogin() {
    return (
        <div className="mt-6">

            <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-gray-400">
                    OR
                </span>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#0B1220] py-3 text-white transition hover:border-indigo-500"
            >
                <span>🔵</span>
                Continue with Google
            </button>

        </div>
    );
}