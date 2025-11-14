import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

// GET - Get current tournament settings
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
      .from('tournament_settings')
      .select('*')
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get tournament settings error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tournament settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Update tournament settings
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
    const body = await request.json();
    const { current_pub_id, tournament_started, tournament_ended } = body;

    const updateData: any = { updated_at: new Date().toISOString() };
    
    if (current_pub_id !== undefined) updateData.current_pub_id = current_pub_id;
    if (tournament_started !== undefined) updateData.tournament_started = tournament_started;
    if (tournament_ended !== undefined) updateData.tournament_ended = tournament_ended;

    const { data, error } = await supabaseAdmin
      .from('tournament_settings')
      .update(updateData)
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Update tournament settings error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update tournament settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
