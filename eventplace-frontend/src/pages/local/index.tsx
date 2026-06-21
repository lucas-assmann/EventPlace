import { TypographyH1 } from "@/components/ui/typography";

export function LocalEvent() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 ">
        <div className="ml-3 border-b-2 border-purple-500/50">
          <TypographyH1 className="font-bold text-white w-full">
            Próximos de <span className="text-[#7C3AED] font-bold text-[56px]">VOCÊ</span>
          </TypographyH1>
        </div>
      </main>
    </div>
  );
}