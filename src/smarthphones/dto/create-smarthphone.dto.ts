import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

//aqui definimos la data que vamos a recibir en nuestro endpoint
export class CreateSmarthphoneDto {

    @IsString()
    @MinLength(1)
    nombre: string;
  
    @IsString()
    @MinLength(1)
    modelo: string;
  
    @IsPositive()
    @IsNumber()
    precio_referencial: number;
    
    @IsNumber()
    @IsPositive()
    precio_venta: number;
  
    @IsNumber()
    anio_modelo: number;
  
}
