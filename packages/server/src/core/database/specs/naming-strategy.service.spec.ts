import { NamingStrategyService } from '../naming-strategy.service';

describe('tableName method', () => {
  const namingStrategy = new NamingStrategyService('naming-strategy-test');

  it.each([
    ['users', 'user', undefined],
    ['user_accounts', 'userAccount', undefined],
    ['user_accounts', 'UserAccount', undefined],
    ['someOtherTable', 'userAccount', 'someOtherTable'],
  ])(
    'should return %s when called with %s and %s',
    (expected, targetName, userSpecifiedName) => {
      expect(namingStrategy.tableName(targetName, userSpecifiedName)).toEqual(
        expected,
      );
    },
  );
});

describe('columnName method', () => {
  const namingStrategy = new NamingStrategyService('naming-strategy-test');

  it.each([
    ['name', 'name', undefined],
    ['name', 'Name', undefined],
    ['user_account', 'userAccount', undefined],
    ['user_account', 'UserAccount', undefined],
    ['someOtherColumnName', 'userName', 'someOtherColumnName'],
  ])(
    'should return %s when called with %s and %s',
    (expected, propertyName, customName) => {
      expect(namingStrategy.columnName(propertyName, customName)).toEqual(
        expected,
      );
    },
  );
});

describe('joinColumnName method', () => {
  const namingStrategy = new NamingStrategyService('naming-strategy-test');

  it.each([
    ['user_id', 'user', 'id'],
    ['name_id', 'Name', 'id'],
    ['user_account_id', 'userAccount', 'id'],
    ['user_account_id', 'UserAccount', 'id'],
  ])(
    'should return %s when called with %s and %s',
    (expected, relationName, referencedColumnName) => {
      expect(
        namingStrategy.joinColumnName(relationName, referencedColumnName),
      ).toEqual(expected);
    },
  );
});
