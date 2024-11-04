import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {





  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http:AxiosAdapter
  ) {
  }

  async executeSeed() {
    const pokemonToInsert:{name:string, no:number}[] = [];
    await this.pokemonModel.deleteMany({});
    try {
      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

      data.results.forEach( async({name,url})=>{
        const segments= url.split('/');
        const no = + segments[segments.length-2]
        pokemonToInsert.push({name, no})
      })
      this.pokemonModel.insertMany(pokemonToInsert);
      return 'Seed executed';
    } catch (error) {
      console.log(error);
    }
    return 'Seed executed';
  }

}
