import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Pokemon already exists in db');
      }
      console.log(error);
      throw new InternalServerErrorException('Can´t create pokemon - check server logs');
    }
    
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne( {no:term} )
    }

    if (!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findOne( {_id:term} )
    }

    if (!pokemon){
      pokemon = await this.pokemonModel.findOne( {name:term.toLowerCase()} )
    }

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }
    console.log(pokemon);
    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    const pokemon = await this.findOne(term);

    try {
      await pokemon.updateOne(updatePokemonDto, {new:true});

    return {...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Pokemon already exists in db');
      }
      console.log(error);
      throw new InternalServerErrorException('Can´t create pokemon - check server logs');
    }

    
  }

  async remove(id: string) {
      const pokemon = await this.pokemonModel.deleteOne({_id:id});
      if (pokemon.deletedCount === 0) {
        throw new NotFoundException('Pokemon not found');
      }
      return 'Pokemon deleted';
  }


}
