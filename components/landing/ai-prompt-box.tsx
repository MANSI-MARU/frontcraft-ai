import GradientButton from "@/components/common/gradient-button";

export default function AIPromptBox() {
    return (
        <div className="mt-16 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <label className="mb-4 block text-left text-sm font-medium text-muted-foreground">
                Describe your project
            </label>

            <textarea
                placeholder="Create a modern SaaS dashboard with authentication, analytics and dark mode..."
                className="h-36 w-full resize-none rounded-2xl border border-white/10 bg-background p-4 outline-none"
            />

            <div className="mt-6 flex justify-end">
                <GradientButton>
                    Generate Project
                </GradientButton>
            </div>
        </div>
    );
}