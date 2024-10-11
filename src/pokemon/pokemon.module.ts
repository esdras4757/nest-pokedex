import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { pokemonSchema, Pokemon } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [MongooseModule.forFeature([{name:Pokemon.name,schema:pokemonSchema}])]
})
export class PokemonModule {}
