import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';
import PersistLogin from '../../components/PersistLogin';

export default function BookingPage() {
  return (
    <PersistLogin>
      <ProtectRoute>
        <Booking />
      </ProtectRoute>
    </PersistLogin>
  );
}

function Booking() {
  return <div>BookingPage</div>;
}
