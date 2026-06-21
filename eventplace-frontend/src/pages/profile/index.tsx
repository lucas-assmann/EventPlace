import { InfoCard } from '@/components/info-card';
import { ProfileSkeleton } from '@/components/skeleton/profile-skeleton.index';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypographyP } from "@/components/ui/typography";
import type { UserDTO } from '@/interface/user-interface';
import api from '@/lib/api';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserDTO | null>(null);

  useEffect(() => {
    api.get<UserDTO>('/user')
      .then(response => setUserData(response.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-4 gap-6 max-w-7xl mx-auto flex flex-col">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        userData && (
          <div key={userData.id}>
            <div className="flex items-center bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between">
              <div className="flex items-center gap-10">
                <Avatar className="border-2 border-[#7c3aeD] bg-white/5 cursor-pointer h-32 w-32">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="bg-purple-950 text-[10px] text-white text-4xl font-bold">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div>
                    <TypographyP className="border-none text-3xl font-bold text-white">{userData.name}</TypographyP>
                    <TypographyP className=" text-gray-500">@{userData.username}</TypographyP>
                    <TypographyP className="text-gray-500">
                      Entrou em{" "}
                      {new Date(userData.createdAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TypographyP>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/40 mt-1 h-6">
                      {userData.userAge === 'ADULT' ? 'Maior de 18 anos' : 'Menor de 18 anos'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Link to="/edit-profile">
                  <Button variant="outline" className="cursor-pointer h-10 mt-4 bg-[#7c3aeD]/30 hover:bg-[#7c3aeD]/90 text-[#7c3aeD] hover:text-white border-[#5b17cf]">
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar perfil
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard title="4" description="Eventos criados" />
              <InfoCard title="12" description="Eventos participados" />
              <InfoCard title="8" description="Avaliação Média" />
            </div>

            <div className="flex flex-col bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between mt-6">
              <Label className="text-white text-2xl font-bold">Dados Pessoais</Label>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 uppercase">
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-500 font-normal">Nome</Label>
                  <Input type="text" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" value={userData.name} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-500 font-normal">Email</Label>
                  <Input type="email" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" value={userData.email} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-500 font-normal">Telefone</Label>
                  <Input type="text" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" readOnly />
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label className="text-gray-500 font-normal">Senha</Label>
                  <Input type="password" className="bg-black border-[0.5px] border-gray-500 h-12 text-white" placeholder="*****" readOnly />
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-[#18181b] border-[0.5px] border-[rgba(124,58,237,0.2)] py-6 px-7 rounded-lg justify-between mt-6">
              <Label className="text-white text-2xl font-bold">Eventos Participados</Label>
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard title="Evento 1" description={userData.events[0]?.description} />
                  <InfoCard title="Evento 2" description={userData.events[1]?.description} />
                  <InfoCard title="Evento 3" description={userData.events[2]?.description} />
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}