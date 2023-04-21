import { gql } from '@apollo/client';

export const getOrdersQuery = gql`
query getOrders($filters: FilterOrderInputDto) {
  getOrders(filters: $filters) {
    orders {
      id
      createdAt
      updatedAt
      accountId
      productsId
    }
    count
  }
}
`;

export const createOrderMutation = gql`
  mutation createOrder($order: OrderInputDto!) {
    createOrder(order: $order) {
      ... on SuccessOrder {
        success
        message
        id
      }
      ... on GraphqlErrorOrder {
        success
        message
        code
      }
    }
  }
`;

export const updateOrderMutation = gql`
  mutation updateOrder($order: UpdateOrderInputDto!) {
    updateOrder(order: $order) {
      ... on SuccessOrder {
        success
        message
      }
      ... on GraphqlErrorOrder {
        success
        message
        code
      }
    }
  }
`;

export const deleteOrderMutation = gql`
  mutation deleteOrder($orderId: String!) {
    deleteOrder(orderId: $orderId) {
      ... on SuccessOrder {
        success
        message
      }
      ... on GraphqlErrorOrder {
        success
        message
        code
      }
    }
  }
`;
