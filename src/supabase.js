import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vewwzwzxbczedwfoubfo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld3d6d3p4YmN6ZWR3Zm91YmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4NDM2NDUsImV4cCI6MjAxMDQxOTY0NX0.iG_yOZMwFtxsyF-OSv5ZLmpX9UKYjtQ20G8SnVbxxkQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
