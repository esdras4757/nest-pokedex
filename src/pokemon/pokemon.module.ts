import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { pokemonSchema, Pokemon } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{name:Pokemon.name,schema:pokemonSchema}])],
  exports: [PokemonModule]
})
export class PokemonModule {}
