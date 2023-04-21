import { gql } from '@apollo/client';

export const getAccountsQuery = gql`
query getAccounts($filters: FilterAccountInputDto) {
  getAccounts(filters: $filters) {
    accounts {
      id
      createdAt
      updatedAt
      firstname
      lastname
      email
      ordersId
    }
    count
  }
}
`;

export const loginMutation = gql`
  mutation login($account: LoginInputDto!) {
    login(account: $account) {
      ... on AuthPayloadDto {
        token
      }
      ... on GraphqlErrorAccount {
        code
        message
      }
    }
  }
`;

export const createAccountMutation = gql`
  mutation createAccount($account: AccountInputDto!) {
    createAccount(account: $account) {
      ... on SuccessAccount {
        success
        message
        id
      }
      ... on GraphqlErrorAccount {
        success
        message
        code
      }
    }
  }
`;

export const updateAccountMutation = gql`
  mutation updateAccount($account: UpdateAccountInputDto!) {
    updateAccount(account: $account) {
      ... on SuccessAccount {
        success
        message
      }
      ... on GraphqlErrorAccount {
        success
        message
        code
      }
    }
  }
`;

export const deleteAccountMutation = gql`
  mutation deleteAccount($accountId: String!) {
    deleteAccount(accountId: $accountId) {
      ... on SuccessAccount {
        success
        message
      }
      ... on GraphqlErrorAccount {
        success
        message
        code
      }
    }
  }
`;
