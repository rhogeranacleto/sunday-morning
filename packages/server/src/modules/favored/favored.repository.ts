import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FavoredQueryDTO } from './favored.dto';
import { Favored } from './favored.entity';

@EntityRepository(Favored)
export class FavoredRepository extends Repository<Favored> {
  public getAll({
    take,
    search,
    skip,
  }: FavoredQueryDTO): Promise<[Favored[], number]> {
    const qb = this.createQueryBuilder('favored')
      .take(take)
      .skip(skip)
      .innerJoinAndSelect('favored.bank', 'bank');

    this.addSearchQuery(qb, search);

    return qb.getManyAndCount();
  }

  private addSearchQuery(
    qb: SelectQueryBuilder<Favored>,
    search?: string,
  ): void {
    if (search) {
      qb.where(`favored.name ILIKE :search`)
        .orWhere(`favored.cpf_cnpj ILIKE :search`)
        .orWhere(`favored.agency ILIKE :search`)
        .orWhere(
          `favored.bank_account || '-' || bank_account_digit ILIKE :search`,
        )
        .setParameters({ search: `%${search}%` });
    }
  }
}
