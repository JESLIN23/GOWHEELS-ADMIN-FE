import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';

export default function OffersPage() {
  return (
      <ProtectRoute>
        <Offers />
      </ProtectRoute>
  );
}

function Offers() {
  return <div>OffersPage</div>;
}
