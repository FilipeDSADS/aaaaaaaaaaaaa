import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { TarefaModule } from './tarefa/tarefa.module';
import { CartaoModule } from './cartao/cartao.module';
import { Tarefa } from './tarefa/tarefa.entity';
import { Cartao } from './cartao/cartao.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "unicesumar",
      password: "unicesumar",
      database: "blog",
      entities: [Category, User, Tarefa, Cartao],
      synchronize: true
    }),
    CategoriesModule,
    UsersModule,
    TarefaModule,
    CartaoModule // CartaoModule já inclui o CartaoService e CartaoController
  ],
  controllers: [AppController], // Apenas o AppController aqui
  providers: [AppService] // Apenas o AppService aqui
})
export class AppModule { }