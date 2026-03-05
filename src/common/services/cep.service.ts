import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;
  erro?: boolean;
}

@Injectable()
export class CepService {
  private readonly VIACEP_URL = 'https://viacep.com.br/ws';

  constructor(private httpService: HttpService) {}

  /**
   * Busca endereço por CEP via API ViaCEP
   */
  async buscarEnderecoPorCep(cep: string): Promise<EnderecoViaCep> {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Valida formato (8 dígitos)
    if (cepLimpo.length !== 8) {
      throw new BadRequestException('CEP deve conter 8 dígitos');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<EnderecoViaCep>(
          `${this.VIACEP_URL}/${cepLimpo}/json/`,
          {
            timeout: 5000,
          }
        )
      );

      const endereco = response.data;

      // ViaCEP retorna { erro: true } quando CEP não existe
      if (endereco.erro) {
        throw new BadRequestException('CEP não encontrado');
      }

      return endereco;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar CEP. Tente novamente.');
    }
  }
}
