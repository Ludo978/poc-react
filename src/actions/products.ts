import { gql } from '@apollo/client';

export const getProductsQuery = gql`
query getProducts($filters: FilterProductInputDto) {
  getProducts(filters: $filters) {
    products {
      id
      createdAt
      updatedAt
      name
      price
      description
      image
    }
    count
  }
}
`;

export const createProductMutation = gql`
  mutation createProduct($product: ProductInputDto!) {
    createProduct(product: $product) {
      ... on SuccessProduct {
        success
        message
        id
      }
      ... on GraphqlErrorProduct {
        success
        message
        code
      }
    }
  }
`;

export const updateProductMutation = gql`
  mutation updateProduct($product: UpdateProductInputDto!) {
    updateProduct(product: $product) {
      ... on SuccessProduct {
        success
        message
      }
      ... on GraphqlErrorProduct {
        success
        message
        code
      }
    }
  }
`;

export const deleteProductMutation = gql`
  mutation deleteProduct($productId: String!) {
    deleteProduct(productId: $productId) {
      ... on SuccessProduct {
        success
        message
      }
      ... on GraphqlErrorProduct {
        success
        message
        code
      }
    }
  }
`;
