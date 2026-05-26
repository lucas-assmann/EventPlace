import { InfoCard } from '@/components/info-card';
import { TicketCard } from '@/components/ticket';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyP } from "@/components/ui/typography";
import { Pencil } from 'lucide-react';


export function Profile() {
  return (
    <div className="p-4 gap-6 flex flex-col">
      <div className="flex items-center bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between">
        <div className="flex items-center gap-10">
          <Avatar className="border-2 border-[#7c3aeD] bg-white/5 cursor-pointer h-35 w-35">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-purple-950 text-[10px] text-white text-4xl font-bold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div>
              <TypographyP className="border-none text-3xl font-bold text-white">João Dias</TypographyP>
              <TypographyP className=" text-gray-500">@joaodias</TypographyP>
              <TypographyP className=" text-gray-500">Entrou em 2023</TypographyP>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/40 mt-1 h-6">
                Organizador
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/40 mt-1 h-6">
                Verificado
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" className="cursor-pointer h-10 mt-4 bg-[#7c3aeD]/30 hover:bg-[#7c3aeD]/90 text-[#7c3aeD] hover:text-white border-[#5b17cf]">
            <Pencil className="mr-2 h-4 w-4" />
            Editar perfil
          </Button>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <InfoCard title="4" description="Eventos criados" />
        <InfoCard title="12" description="Eventos participados" />
        <InfoCard title="8" description="Avaliação Média" />
      </div>

      <div className="flex flex-col bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between">
        <Label className="text-white text-2xl font-bold">Dados Pessoais</Label>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-transform: uppercase ">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 font-normal">Nome</Label>
            <Input type="text" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 font-normal">Email</Label>
            <Input type="email" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 font-normal">Telefone</Label>
            <Input type="text" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label className="text-gray-500 font-normal">Senha</Label>
            <Input type="password" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between gap-4">
        <Label className="text-white text-2xl font-bold">Meus eventos</Label>

        <div>
          <TicketCard id='1' name="Pista" event="Noite de Jazz & Blues" date="28 Jun 2025 · 21h00" status="ativo" />
        </div>
      </div>
    </div>
  )
}