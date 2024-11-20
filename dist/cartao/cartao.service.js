"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cartao_entity_1 = require("./cartao.entity");
const tarefa_entity_1 = require("../tarefa/tarefa.entity");
const cartao_gateway_1 = require("./cartao.gateway");
let CartaoService = class CartaoService {
    constructor(cartaoRepository, tarefaRepository, cartaoGateway) {
        this.cartaoRepository = cartaoRepository;
        this.tarefaRepository = tarefaRepository;
        this.cartaoGateway = cartaoGateway;
    }
    async create(criarCartaoDto) {
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
    findAll() {
        return this.cartaoRepository.find({ relations: ['tarefa'] });
    }
    findOne(id) {
        return this.cartaoRepository.findOne({
            where: { id },
            relations: ['tarefa'],
        });
    }
    async update(id, atualizarCartaoDto) {
        await this.cartaoRepository.update(id, atualizarCartaoDto);
        const updatedCartao = await this.findOne(id);
        this.cartaoGateway.sendUpdate('cartaoUpdated', updatedCartao);
        return updatedCartao;
    }
    async remove(id) {
        await this.cartaoRepository.delete(id);
        this.cartaoGateway.sendUpdate('cartaoRemoved', { id });
    }
    async atualizarStatus(id, status) {
        await this.cartaoRepository.update(id, { status });
        const updatedCartao = await this.findOne(id);
        this.cartaoGateway.sendUpdate('cartaoStatusUpdated', updatedCartao);
        return updatedCartao;
    }
};
exports.CartaoService = CartaoService;
exports.CartaoService = CartaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cartao_entity_1.Cartao)),
    __param(1, (0, typeorm_1.InjectRepository)(tarefa_entity_1.Tarefa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cartao_gateway_1.CartaoGateway])
], CartaoService);
//# sourceMappingURL=cartao.service.js.map