import React from 'react';
import ProtectRoute from '../../components/ProtectRoute';

export default function BookingPage() {
  return (
      <ProtectRoute>
        <Booking />
      </ProtectRoute>
  );
}

function Booking() {
  return <div>BookingPage</div>;
}
