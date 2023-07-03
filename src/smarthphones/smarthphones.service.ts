import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSmarthphoneDto } from './dto/create-smarthphone.dto';
import { UpdateSmarthphoneDto } from './dto/update-smarthphone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Smarthphone } from './entities/smarthphone.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'

@Injectable()
export class SmarthphonesService {

  //inyectamos nuestro repositorio
  constructor(
    @InjectRepository( Smarthphone )
    private readonly smarthphoneRepository: Repository< Smarthphone >
  ){}

  async create(createSmarthphoneDto: CreateSmarthphoneDto) {
    try {
      //solo creamos una instacia del smarthpone
      const smarthphone = this.smarthphoneRepository.create(createSmarthphoneDto)
      //guardanmos en la BD
      await this.smarthphoneRepository.save(smarthphone)
      return smarthphone;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ayuda!')
    }
  }

  async findAll() {
    const smarthphones = await this.smarthphoneRepository.find({
      where: {eliminado: false},
      order: {
        fecha_creacion: 'ASC'
      }
    }) 
    return smarthphones
  }

  async findOne(term: string) {
    //Podemos hacer la busqueda por modelo, nombre o el ID
    let smarthphone:Smarthphone

    if(  isUUID(term) ){
      smarthphone = await this.smarthphoneRepository.findOne({
        where: { id: term, eliminado: false}
      })
    }else{
      const queryBuilder = this.smarthphoneRepository.createQueryBuilder();
      smarthphone = await queryBuilder
        .where('UPPER(nombre) =:nombre or UPPER(modelo) =:modelo',{
          nombre: term.toUpperCase(),
          modelo: term.toUpperCase()
        })
        .andWhere('eliminado: false')
        .getOne()
    }
    if(!smarthphone) 
      throw new NotFoundException('No se encontro el smartphone')
    
    return smarthphone
  }

  //TODO: asignar la modificacion new fecha

  async update(id: string, updateSmarthphoneDto: UpdateSmarthphoneDto) {

    const smarthphone = await this.smarthphoneRepository.findOneBy({id})

    if(!smarthphone)
      throw new NotFoundException('El smartphone no existe')

    if(smarthphone.eliminado)
      throw new BadRequestException('No se puede editar un smart eliminado')

    try {
      
      Object.assign(smarthphone, updateSmarthphoneDto);
      smarthphone.fecha_actualizacion = new Date()
      await this.smarthphoneRepository.save(smarthphone);
      return smarthphone;

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ayuda!')
    }

  }
  
  async remove(id: string) {
   await this.findOne(id)

    await this.smarthphoneRepository.update(id, { eliminado: true, fecha_actualizacion: new Date() });
    return `La accion a eliminado el #${id} smarthphone`;
  }

}
