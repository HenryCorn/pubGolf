import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

// GET - List all players
export const GET: APIRoute = async ({ cookies }) => {
  // Check authentication
  const authCookie = cookies.get('admin-auth');
  if (!authCookie || authCookie.value !== 'true') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('players')
      .select('*')
      .order('name');

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get players error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch players' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Create a new player
export const POST: APIRoute = async ({ request, cookies }) => {
  // Check authentication
  const authCookie = cookies.get('admin-auth');
  if (!authCookie || authCookie.value !== 'true') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const avatar = (formData.get('avatar') as string) || '👤';

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabaseAdmin
      .from('players')
      .insert([{ name, avatar }])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Create player error:', error);
    
    // Handle duplicate name error
    if (error?.code === '23505') {
      return new Response(JSON.stringify({ error: 'Player name already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to create player' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
