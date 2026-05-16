/**
 * WhatsApp Business profile or chat link (wa.me, api.whatsapp.com, or catalog URL).
 * Example: https://wa.me/15551234567
 */
const DUMMY_WHATSAPP_BUSINESS_URL = 'https://wa.me/15551234567';

export const WHATSAPP_BUSINESS_URL =
    import.meta.env.VITE_WHATSAPP_BUSINESS_URL?.trim() || DUMMY_WHATSAPP_BUSINESS_URL;
