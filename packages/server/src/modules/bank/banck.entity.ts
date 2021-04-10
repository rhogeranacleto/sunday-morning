import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Bank extends BaseEntity {
  @PrimaryColumn()
  public code: string;

  @Column()
  public name: string;
}
