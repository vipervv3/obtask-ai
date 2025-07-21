import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'

export function createClient() {
  return createClientComponentClient()
}

export type AuthUser = User