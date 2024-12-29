'use server';

import { User, UserMetadata } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserSession {
  user: User | null;
  userMetadata: UserMetadata | null;
  permissionsRole: string | null;
  setUserSession: (userMetadata: UserMetadata) => void;
  setPermissionsRole: (role: string) => void;
}

export const useUserStore = create<UserSession>((set) => ({
  user: null,
  userMetadata: null,
  permissionsRole: null,
  setUserSession: (userMetadata) => set({ userMetadata }),
  setPermissionsRole: (role) => set({ permissionsRole: role }),
}));
