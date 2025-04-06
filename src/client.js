import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://impbqvoyixsfbhqlbrib.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGJxdm95aXhzZmJocWxicmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NTk0NjEsImV4cCI6MjA1OTUzNTQ2MX0.jrSCkaaSx9yliwA4-OwI25wSCaR4a6_xA1bEG5Uq18I'
export const supabase = createClient(supabaseUrl, supabaseKey)