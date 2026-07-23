export default function PropertiesPanel() {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <h2 className="text-lg font-semibold text-white">
                Properties
            </h2>

            <p className="mt-1 text-sm text-gray-400">
                Configure the selected component.
            </p>

            <div className="mt-6 flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-700 bg-[#0F172A]">
                <p className="text-center text-gray-500">
                    Select a component to edit its properties.
                </p>
            </div>
        </div>
    );
}