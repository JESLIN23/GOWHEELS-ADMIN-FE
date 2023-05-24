import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';
import PersistLogin from '../../components/PersistLogin';

export default function CarsPage() {
  return (
    <PersistLogin>
      <ProtectRoute>
        <Cars />
      </ProtectRoute>
    </PersistLogin>
  );
}

function Cars() {
  return <div>CarsPage</div>;
}
