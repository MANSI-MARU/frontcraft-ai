export default function PreviewPanel() {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Live Preview
                </h2>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Ready
                </span>
            </div>

            <div className="mt-5 flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-[#0F172A]">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-white">
                        Preview Area
                    </h3>

                    <p className="mt-2 text-gray-400">
                        Generated UI will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
}