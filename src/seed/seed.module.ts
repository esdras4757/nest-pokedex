import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CommonModule,PokemonModule, MongooseModule.forFeature([{name:Pokemon.name,schema:pokemonSchema}])]
})
export class SeedModule {}
