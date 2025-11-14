import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

// POST - Submit or update a score (upsert)
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
    const player_id = formData.get('player_id') as string;
    const pub_id = formData.get('pub_id') as string;
    const sips = parseInt(formData.get('sips') as string) || 0;
    const penalties = parseInt(formData.get('penalties') as string) || 0;
    const bonuses = parseInt(formData.get('bonuses') as string) || 0;

    // Validation
    if (!player_id || !pub_id) {
      return new Response(JSON.stringify({ error: 'Player ID and Pub ID are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (sips < 0 || penalties < 0 || bonuses < 0) {
      return new Response(JSON.stringify({ error: 'Scores must be non-negative' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Upsert the score (insert or update if exists)
    const { data, error } = await supabaseAdmin
      .from('scores')
      .upsert({
        player_id,
        pub_id,
        sips,
        penalties,
        bonuses,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'player_id,pub_id'
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Submit score error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit score' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET - Get all scores (optional, for debugging)
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
      .from('scores')
      .select('*');

    if (error) throw error;

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get scores error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch scores' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
