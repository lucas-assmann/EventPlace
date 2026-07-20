import { TypographyH1 } from "@/components/ui/typography";

export function LocalEvent() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-10 ">
        <div className="ml-3 border-b-2 border-purple-500/50 pb-3">
          <TypographyH1 className="w-full font-bold text-white">
            Próximos de{" "}
            <span className="text-[56px] font-bold text-[#7C3AED]">
              você
            </span>
          </TypographyH1>
        </div>
      </main>
    </div>
  );
}