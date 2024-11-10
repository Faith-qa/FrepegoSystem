import {gql, useQuery} from "@apollo/client";
import {getPlatform} from "babel-preset-expo/build/common";

export const TABLE_ITEMS_QUERY = gql `
query{
  allTables{
    capacity
    number
    id
  }
}
`

export const CREATE_ORDER_MUTATION = gql `
mutation CreateOrder($tableNumber: Int!, $orderItems: [OrderItemInput!]!) {
  createOrder(input: { tableNumber: $tableNumber, orderItems: $orderItems }) {
    order {
      id
      orderNumber
      table {
        number
      }
      status
      totalCharge
      orderItems {
        menuItem {
          title
          price
        }
        quantity
      }
    }
  }
}


`

