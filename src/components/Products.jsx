import React from 'react';
import { getProducts } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export default function Products() {
  const { isLoading, error, data: products } = useQuery(['products'], getProducts);

  return (
    <>
      {isLoading && <p>Is Loading</p>}
      {error && <p>Error</p>}
      {products && (
        <ul className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
