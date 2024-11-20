import { Repository } from 'typeorm';
import { Cartao } from './cartao.entity';
import { CriarCartaoDto } from './DTO/criar-cartao.dto';
import { AtualizarCartaoDto } from './DTO/atualizar-cartao.dto';
import { Tarefa } from '../tarefa/tarefa.entity';
import { CartaoGateway } from './cartao.gateway';
export declare class CartaoService {
    private cartaoRepository;
    private tarefaRepository;
    private cartaoGateway;
    constructor(cartaoRepository: Repository<Cartao>, tarefaRepository: Repository<Tarefa>, cartaoGateway: CartaoGateway);
    create(criarCartaoDto: CriarCartaoDto): Promise<Cartao>;
    findAll(): Promise<Cartao[]>;
    findOne(id: number): Promise<Cartao>;
    update(id: number, atualizarCartaoDto: AtualizarCartaoDto): Promise<Cartao>;
    remove(id: number): Promise<void>;
    atualizarStatus(id: number, status: 'A Fazer' | 'Em Progresso' | 'Concluído'): Promise<Cartao>;
}
