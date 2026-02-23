import crypto from 'crypto';

const BUNDLE_VARIANT_ID = '47819614978302';

function hmacToken(orderId, email, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(`${orderId}:${email.toLowerCase().trim()}`)
    .digest('hex');
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order_id, email } = req.query;

  if (!order_id || !email) {
    return res.status(400).json({ error: 'Missing order_id or email' });
  }

  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  const hmacSecret = process.env.SHOPIFY_HMAC_SECRET;

  if (!adminToken || !hmacSecret) {
    console.error('Missing required environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const shopUrl = 'coventry-labs-llc.myshopify.com';
    const response = await fetch(
      `https://${shopUrl}/admin/api/2024-01/orders/${order_id}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': adminToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 404) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!response.ok) {
      console.error('Shopify API error:', response.status, await response.text());
      return res.status(502).json({ error: 'Failed to fetch order' });
    }

    const data = await response.json();
    const order = data.order;

    // Verify email matches
    const orderEmail = (order.email || '').toLowerCase().trim();
    const inputEmail = email.toLowerCase().trim();
    if (orderEmail !== inputEmail) {
      return res.status(403).json({ error: 'Email does not match order' });
    }

    // Verify order is paid
    if (order.financial_status !== 'paid') {
      return res.status(403).json({ error: 'Order is not paid' });
    }

    // Verify order contains the bundle variant
    const lineItems = order.line_items || [];
    const hasBundle = lineItems.some(
      (item) => String(item.variant_id) === BUNDLE_VARIANT_ID
    );

    if (!hasBundle) {
      return res.status(403).json({ error: 'Order does not contain the guide bundle' });
    }

    // All checks passed — issue a signed token
    const token = hmacToken(order_id, email, hmacSecret);

    return res.status(200).json({
      verified: true,
      token,
      order_id,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
