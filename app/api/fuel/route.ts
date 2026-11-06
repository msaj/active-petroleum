import { NextResponse } from 'next/server';

// تحديث الأسعار كل ساعة تلقائياً (3600 ثانية)
export const revalidate = 3600; 

export async function GET() {
  try {
    // الدخول برمجياً إلى موقع IPT
    const res = await fetch('https://iptgroup.com.lb/ipt/en/home', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      next: { revalidate: 3600 }
    });
    
    const html = await res.text();

    // دالة استخراج السعر من كود الـ HTML اللي بعتلي ياه
    const extractPrice = (label: string) => {
      const safeLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`<span class="item-info">${safeLabel}</span>\\s*<span class="item-price">(.*?)\\s*L\\.L\\.</span>`, 'i');
      const match = html.match(regex);
      return match ? match[1].trim() : "غير متوفر";
    };

    // استخراج أسعار اليوم
    const prices = {
      "95": extractPrice('UNL 95'),
      "98": extractPrice('UNL 98'),
      "DIESEL": extractPrice('Diesel'),
      "GAS": extractPrice('Gas (LPG)')
    };

    return NextResponse.json(prices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live prices' }, { status: 500 });
  }
}
