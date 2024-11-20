import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from './cartao.entity';
import { CartaoService } from './cartao.service';
import { CartaoController } from './cartao.controller';
import { Tarefa } from '../tarefa/tarefa.entity';
import { CartaoGateway } from './cartao.gateway'; // Importar o CartaoGateway

@Module({
  imports: [TypeOrmModule.forFeature([Cartao, Tarefa])],
  providers: [CartaoService, CartaoGateway], // Adicionar CartaoGateway aos providers
  controllers: [CartaoController],
})
export class CartaoModule {}