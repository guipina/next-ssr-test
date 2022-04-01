import {gql} from "@apollo/client";

export const QUERY_GET_PRODUCTS = gql`
    query Products {
      products {
        id
        name
        price
        onSale
        category {
          name
        }
      }
    }
`;

export const QUERY_GET_REVIEWS = gql`
    query Reviews {
      reviews {
        id
        title
        comment
        date
        rating
      }
    }
`;

export const QUERY_GET_ARTICLES = gql`
    query Articles {
      articles {
        id
        slug
        title
        content
      }
    }
`;

export const QUERY_GET_ARTICLE = gql`
  query Article($slug: String!) {
    article(slug: $slug) {
      slug
      title
      content
    }
  }
`;

export const GET_PRODUCTS = {query: QUERY_GET_PRODUCTS};
export const GET_ARTICLES = {query: QUERY_GET_ARTICLES};
export const GET_ARTICLE = (slug) => {return {query: QUERY_GET_ARTICLE, variables: {"slug":slug}}};