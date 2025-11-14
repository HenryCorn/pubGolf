import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

// DELETE - Remove a player
export const DELETE: APIRoute = async ({ params, cookies }) => {
  // Check authentication
  const authCookie = cookies.get('admin-auth');
  if (!authCookie || authCookie.value !== 'true') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const playerId = params.id;

  if (!playerId) {
    return new Response(JSON.stringify({ error: 'Player ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { error } = await supabaseAdmin
      .from('players')
      .delete()
      .eq('id', playerId);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete player error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete player' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
