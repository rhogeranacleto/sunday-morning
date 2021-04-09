import * as pluralize from 'pluralize';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class NamingStrategyService extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  constructor(public name: string) {
    super();
  }

  public tableName(targetName: string, userSpecifiedName?: string): string {
    if (userSpecifiedName) {
      return userSpecifiedName;
    }

    return super.tableName(
      targetName,
      pluralize.plural(this.camelToSnakeCase(targetName)),
    );
  }

  public columnName(propertyName: string, customName?: string): string {
    if (customName) {
      return customName;
    }

    return this.camelToSnakeCase(propertyName);
  }

  public joinColumnName(
    relationName: string,
    referencedColumnName: string,
  ): string {
    return this.camelToSnakeCase(`${relationName}_${referencedColumnName}`);
  }

  private camelToSnakeCase(cameCaseText: string): string {
    return cameCaseText
      .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      .replace(/^_/, '');
  }
}
