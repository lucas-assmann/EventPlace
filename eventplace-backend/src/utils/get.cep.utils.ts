import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvalidUserCepException } from 'src/errors/user.error';
import { AddressResponse } from 'src/user/dto/create-user.dto';

@Injectable()
export class GetCep {
  constructor(private readonly httpService: HttpService) {}
  async getCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = (await response.json()) as AddressResponse;

    if (data.erro) {
      throw new InvalidUserCepException();
    }

    return data;
  }
}
