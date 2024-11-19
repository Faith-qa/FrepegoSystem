import {gql, useQuery} from "@apollo/client";
import {getPlatform} from "babel-preset-expo/build/common";

export const ALL_BOOKINGS = gql`
    query{
    allBookings {
    id
    guests{
        id  
    }
    totalCharge
    room{
        id
      roomNumber
    }
    checkOut
    checkIn
    checkoutStatus
    isCancelled
  }
}
`
export const CHECKOUT_BOOKING = gql`
mutation CheckoutBooking($bookingId: String!) {
  checkoutBooking(bookingId: $bookingId) {
    booking {
      id
    }
  }
}
`

export const PENDING_BOOKINGS = gql`
query BookingsPendingCheckout{
    bookingsPendingCheckout {
    id
    guests{
        id
        name
        phoneNumber  
    }
    totalCharge
    room{
        id
      roomNumber
    }
    checkOut
    checkIn
    checkoutStatus
    isCancelled
  }
  }
`
export const GET_DATA_FROM_TABLE = gql`
  query GetDataFromTable($tableName: String!, $startDate: String!, $endDate: String!) {
    dataFromTable(
      tableName: $tableName,
      startDate: $startDate,
      endDate: $endDate
    )
  }
`;

export const ALL_ORDERS = gql `
query{
    allOrders{
        id
        orderNumber
        orderItems {
          id
          menuItem{
            id
            title
          }
          quantity
        }
        createdAt
        status
        totalCharge
      }
}
`
export const CREATE_GUEST_MUTATION = gql `
mutation CreateGuest($name: String!, $phone_number: String!, $id_number: String!) {
  createGuest(name: $name, phoneNumber: $phone_number, idNumber: $id_number) {
    guest {
      id
      name
    }
  }
}

`
export const CREATE_BOOKING_MUTATION = gql `
mutation CreateBooking($guestIds: [String!]!, $roomId: String!, $checkIn: String!, $checkOut: String!) {
  createBooking(guestIds: $guestIds, roomId: $roomId, checkIn: $checkIn, checkOut: $checkOut) {
    booking {
      id
      room {
        id
        roomNumber
        roomType {
          id
          name
          pricePerNight
        }
      }
      checkIn
      checkOut
      guests {
        id
        name
        phoneNumber
      }
    }
  }
}

`
export const AVAILABLE_ROOMS = gql`
query AvailableRooms($roomType: String!) {
  availableRooms(roomType: $roomType) {
    id
    roomNumber
    roomType {
      id
      name
      description  # Added description here
      pricePerNight
      maxGuests
    }
    isAvailable
  }
}
`

export const TABLE_ITEMS_QUERY = gql `
query{
  allTables{
    capacity
    number
    id
  }
}
`
export const UPDATE_ORDER_STATUS = gql`
mutation UpdateOrderStatus($orderId: String!) {
  updateOrderStatus(orderId: $orderId) {
    order {
      id
      status
    }
  }
}`;

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
`;
export const PENDING_ORDERS_QUERY = gql`
  query PendingOrders {
    pendingOrders {
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
`;
