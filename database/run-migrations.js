// This is a sample script to run the migrations manually using the Supabase JS client
// You can modify this to fit your needs or use the Supabase dashboard/CLI instead

require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Note: This requires a service role key with more permissions

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key (needed for migrations)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  try {
    // Read migration file
    const migrationSQL = fs.readFileSync(path.join(__dirname, 'migrations.sql'), 'utf8');
    
    // Split the migration into separate SQL statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}`);
      
      // Execute the SQL statement directly
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        console.error(`Statement: ${statement}`);
        // You might want to stop here or continue with the next statement
        // process.exit(1);
      }
    }
    
    console.log('All migrations executed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

// Run the migrations
runMigrations(); 