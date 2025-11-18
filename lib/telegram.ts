// Telegram notification library
// Uses native fetch for maximum compatibility

export interface TelegramMessage {
  name: string;
  email: string;
  project: string;
  message: string;
  locale: string;
  ip?: string;
  submissionId?: string;
}

export interface TelegramApiResponse {
  ok: boolean;
  description?: string;
  error_code?: number;
  result?: {
    message_id: number;
    date: number;
    chat: {
      id: number;
      type: string;
    };
    text: string;
  };
}

/**
 * Formats a contact form submission into a readable Telegram message
 */
function formatTelegramMessage(data: TelegramMessage): string {
  const flag = data.locale === 'es' ? '🇪🇸' : '🇺🇸';
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Truncate long messages for better readability
  const truncatedMessage = data.message.length > 500 
    ? `${data.message.substring(0, 500)}...` 
    : data.message;

  return `🚀 *New Contact Form Submission* ${flag}

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
💼 *Project Type:* ${data.project}
🌐 *Language:* ${data.locale === 'es' ? 'Spanish' : 'English'}
🕐 *Time:* ${timestamp}

💬 *Message:*
${truncatedMessage}

${data.submissionId ? `🆔 *Submission ID:* \`${data.submissionId}\`` : ''}
${data.ip ? `🌍 *IP:* \`${data.ip}\`` : ''}

---
Reply directly via email: ${data.email}`;
}

/**
 * Sends a Telegram notification using the Bot API
 * @param data Contact form submission data
 * @returns Promise<boolean> - true if sent successfully, false otherwise
 */
export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
  // Check if Telegram is configured
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('Telegram notification skipped: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return false;
  }

  try {
    const message = formatTelegramMessage(data);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    const result: TelegramApiResponse = await response.json();

    if (!response.ok || !result.ok) {
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        error_code: result.error_code,
        description: result.description,
      });
      return false;
    }

    console.log('Telegram notification sent successfully:', {
      message_id: result.result?.message_id,
      chat_id: chatId,
    });

    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}

/**
 * Test function to verify Telegram bot configuration
 * @returns Promise<boolean> - true if configuration is valid
 */
export async function testTelegramBot(): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN is not configured');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/getMe`;
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error('Telegram bot test failed:', result);
      return false;
    }

    console.log('Telegram bot configuration is valid:', {
      username: result.result.username,
      first_name: result.result.first_name,
      can_join_groups: result.result.can_join_groups,
      can_read_all_group_messages: result.result.can_read_all_group_messages,
    });

    return true;
  } catch (error) {
    console.error('Telegram bot test error:', error);
    return false;
  }
}