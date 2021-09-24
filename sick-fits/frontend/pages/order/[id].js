import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { order } = data;
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order id: </span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Order charge: </span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order total: </span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Order count: </span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>Description: {item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
