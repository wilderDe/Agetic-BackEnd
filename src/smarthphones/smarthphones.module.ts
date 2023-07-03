import { Module } from '@nestjs/common';
import { SmarthphonesService } from './smarthphones.service';
import { SmarthphonesController } from './smarthphones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smarthphone } from './entities/smarthphone.entity';

@Module({
  controllers: [SmarthphonesController],
  providers: [SmarthphonesService],
  // Definimos nuestro entity 
  imports:[
    TypeOrmModule.forFeature( [Smarthphone ])
  ]
})
export class SmarthphonesModule {}
