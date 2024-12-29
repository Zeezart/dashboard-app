import React from 'react';

import { withAuth } from '@/components/shared/WithAuthHoc';

// Pastikan path sesuai lokasi file `withAuth`

function AllUserPage() {
  return <div>AllUserPage</div>;
}

// Bungkus komponen dengan `withAuth` dan tentukan role yang diperlukan
export default withAuth(AllUserPage, { requiredRole: 'admin' });
