import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  init: () => () => void;
  signOut: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,
  init: () => {
    // Set up listener FIRST then fetch session (recommended pattern)
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      set({ session, user: session?.user ?? null });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, loading: false });
    });
    return () => sub.subscription.unsubscribe();
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
