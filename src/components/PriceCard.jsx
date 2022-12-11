import React from 'react';

export default function PriceCard({ text, price }) {
  return (
    <div className="bg-gray-50 p-8">
      <p>{text}</p>
      <p>₩{price}</p>
    </div>
  );
}
