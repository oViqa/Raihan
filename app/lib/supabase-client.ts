import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pcjwtmvvtpghelpnxenc.supabase.com'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjand0bXZ2dHBnaGVscG54ZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDE3MjMsImV4cCI6MjA2MTAxNzcyM30.N-yxkyqnDV5oE9SLlCiONS8UcwrJlnfHxS3Kqx67mR8'

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
