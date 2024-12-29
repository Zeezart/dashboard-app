import React from 'react';

import { withAuth } from '@/components/shared/WithAuthHoc';

function MyProfilePage() {
  return <div>profile MyProfilePage</div>;
}

export default withAuth(MyProfilePage);
