import Container from "@/components/common/container";
import GradientButton from "@/components/common/gradient-button";
import AIPromptBox from "./ai-prompt-box";
import StudioPreview from "./studio-preview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />

        <div className="absolute right-10 top-40 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[120px]" />

      </div>
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
            🚀 AI-Powered Frontend Development Studio
          </span>

          <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
            Build Stunning
            <br />
            Frontends with AI
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Transform your ideas into beautiful, production-ready frontend
            applications using AI. Generate code, preview instantly, and deploy
            faster.
          </p>

          <div className="mt-10 flex flex-col items-center gap-10">
            <div className="flex gap-4">
              <GradientButton>Get Started</GradientButton>

              <button className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5">
                View Demo
              </button>
            </div>

            <AIPromptBox />
            <StudioPreview />
          </div>
        </div>
      </Container>
    </section>

  );
}