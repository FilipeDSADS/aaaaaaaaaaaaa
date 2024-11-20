import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartao } from './cartao.entity';
import { CriarCartaoDto } from './DTO/criar-cartao.dto';
import { AtualizarCartaoDto } from './DTO/atualizar-cartao.dto';
import { Tarefa } from '../tarefa/tarefa.entity';
import { CartaoGateway } from './cartao.gateway'; 

@Injectable()
export class CartaoService {
  constructor(
    @InjectRepository(Cartao)
    private cartaoRepository: Repository<Cartao>,
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
    private cartaoGateway: CartaoGateway,
  ) {}

  async create(criarCartaoDto: CriarCartaoDto): Promise<Cartao> {
    const tarefa = await this.tarefaRepository.findOne({
      where: { id: criarCartaoDto.tarefaId },
    });

    if (!tarefa) {
      throw new Error('Tarefa não encontrada');
    }

    const cartao = this.cartaoRepository.create(criarCartaoDto);
    cartao.tarefa = tarefa; 
    const savedCartao = await this.cartaoRepository.save(cartao);

    this.cartaoGateway.sendUpdate('cartaoCreated', savedCartao);
    
    return savedCartao;
  }

  findAll(): Promise<Cartao[]> {
    return this.cartaoRepository.find({ relations: ['tarefa'] });
  }

  findOne(id: number): Promise<Cartao> {
    return this.cartaoRepository.findOne({
      where: { id },
      relations: ['tarefa'],
    });
  }

  async update(id: number, atualizarCartaoDto: AtualizarCartaoDto): Promise<Cartao> {
    await this.cartaoRepository.update(id, atualizarCartaoDto);
    const updatedCartao = await this.findOne(id);

    this.cartaoGateway.sendUpdate('cartaoUpdated', updatedCartao);
    
    return updatedCartao;
  }

  async remove(id: number): Promise<void> {
    await this.cartaoRepository.delete(id);

    this.cartaoGateway.sendUpdate('cartaoRemoved', { id });
  }

  async atualizarStatus(id: number, status: 'A Fazer' | 'Em Progresso' | 'Concluído'): Promise<Cartao> {
    await this.cartaoRepository.update(id, { status });
    const updatedCartao = await this.findOne(id);

    this.cartaoGateway.sendUpdate('cartaoStatusUpdated', updatedCartao);
    
    return updatedCartao;
  }
}