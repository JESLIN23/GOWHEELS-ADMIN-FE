import React from 'react';
import PageStyles from '../PageStyles.module.css';

export default function OffersPage() {
  return (
      <Offers />
  );
}

function Offers() {
  return (
    <div className={PageStyles.contentWrapper}>
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {'Offer'}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
      </div>
    </div>
  );
}
