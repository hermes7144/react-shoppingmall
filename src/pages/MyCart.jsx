import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;
export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity);
  console.log(totalPrice);
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <div>
          <ul>{products && products.map((product) => <CartItem key={product.id} product={product} />)}</ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
        </div>
      )}
    </section>
  );
}
