import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Es una representación de la tabla de nuestra DB
@Entity()
export class Smarthphone {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
  
    @Column()
    modelo: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    precio_referencial: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    precio_venta: number;
  
    @Column()
    anio_modelo: number;

    //Eliminado logico
    @Column({ default: false })
    eliminado: boolean;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fecha_actualizacion: Date;

    
}
