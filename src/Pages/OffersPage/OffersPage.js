import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';
import PersistLogin from '../../components/PersistLogin';

export default function OffersPage() {
  return (
    <PersistLogin>
      <ProtectRoute>
        <Offers />
      </ProtectRoute>
    </PersistLogin>
  );
}

function Offers() {
  return <div>OffersPage</div>;
}
