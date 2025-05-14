import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
  // Create a new pool using the same connection string as your app
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('Starting database migration...');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'create_projects_table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Execute the SQL
      await client.query(sql);
      
      // Commit the transaction
      await client.query('COMMIT');
      console.log('Migration completed successfully!');
    } catch (err) {
      // If there's an error, rollback the transaction
      await client.query('ROLLBACK');
      throw err;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the migration
runMigration().catch(console.error); 