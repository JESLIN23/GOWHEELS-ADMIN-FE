import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';

export default function CarsPage() {
  return (
    <ProtectRoute>
      <Cars />
    </ProtectRoute>
  );
}

function Cars() {
  return <div>CarsPage</div>;
}
