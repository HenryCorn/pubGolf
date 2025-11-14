// Real-time updates client for Supabase
import { createClient, type RealtimeChannel } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let channel: RealtimeChannel | null = null;

export function initializeRealtime(onUpdate: () => void) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured for realtime');
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Subscribe to score changes
  channel = supabase
    .channel('scores-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'scores'
      },
      (payload) => {
        console.log('Score changed:', payload);
        onUpdate();
      }
    )
    .subscribe((status) => {
      console.log('Realtime subscription status:', status);
    });

  return channel;
}

export function cleanupRealtime() {
  if (channel) {
    channel.unsubscribe();
    channel = null;
  }
}

// Helper to show realtime notification
export function showRealtimeNotification(message: string) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 glass-dark text-white px-6 py-3 rounded-lg z-50 shadow-lg flex items-center space-x-3';
  notification.innerHTML = `
    <div class="live-indicator w-3 h-3 bg-red-500 rounded-full"></div>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  if (window.anime) {
    window.anime({
      targets: notification,
      translateX: [300, 0],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutQuart'
    });
  }
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (window.anime) {
      window.anime({
        targets: notification,
        translateX: [0, 300],
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInQuart',
        complete: () => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }
      });
    } else {
      document.body.removeChild(notification);
    }
  }, 3000);
}
