export type IPermission = {
  id: string;
  created_at: string;
  role: 'user' | 'admin';
  member_id: string;
  member: {
    id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type UserMetadata = {
  email: string;
  email_verified: boolean;
  full_name: string;
  phone_verified: boolean;
  sub: string;
};

export type Role = 'user' | 'admin';
