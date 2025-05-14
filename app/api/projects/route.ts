// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY year DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const pool = getPool();
  try {
    const body = await request.json();
    console.log("Received project data:", body); // Add logging
    
    const { title, year, description, url, content_type, background_color, image_url } = body;
    
    // Validate required fields
    if (!title || !year || !description || !url) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: {
            title: !title ? 'Title is required' : null,
            year: !year ? 'Year is required' : null,
            description: !description ? 'Description is required' : null,
            url: !url ? 'URL is required' : null
          }
        }, 
        { status: 400 }
      );
    }
    
    const result = await pool.query(
      'INSERT INTO projects (title, year, description, url, content_type, background_color, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        title, 
        year, 
        description, 
        url, 
        content_type || 'gradient', 
        background_color || 'cyan-emerald', 
        image_url || null
      ]
    );
    
    console.log("Successfully created project:", result.rows[0]);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    // Return more detailed error information
    return NextResponse.json({ 
      error: 'Failed to create project', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}