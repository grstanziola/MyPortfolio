// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY year DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, year, description, url, content_type, background_color, image_url } = await request.json();
    
    const result = await pool.query(
      'INSERT INTO projects (title, year, description, url, content_type, background_color, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, year, description, url, content_type, background_color, image_url]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}