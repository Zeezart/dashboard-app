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
