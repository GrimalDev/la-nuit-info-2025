import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface DonationData {
  name: string;
  email: string;
  region: string;
  hardwareType: string;
  quantity: number;
  condition: string;
}

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const body: DonationData = await request.json();
    const { name, email, region, hardwareType, quantity, condition } = body;

    // Validate required fields
    if (!name || !email || !region || !hardwareType || !quantity || !condition) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Get client IP
    const clientIp = getClientIp(request);

    // Check IP donation limit
    const [ipRows] = await pool.query<RowDataPacket[]>(
      'SELECT `number-donations` FROM `ip-limit-donations` WHERE ip = ?',
      [clientIp]
    );

    let currentDonations = 0;
    if (ipRows.length > 0) {
      currentDonations = ipRows[0]['number-donations'];
    }

    // Check if adding this donation would exceed the limit
    const newTotal = currentDonations + quantity;
    if (newTotal > 5) {
      return NextResponse.json(
        { 
          error: 'Limite de dons atteinte',
          message: `Vous avez déjà fait don de ${currentDonations} unité(s). Vous ne pouvez pas dépasser 5 unités au total.`,
          currentDonations,
          remainingSlots: Math.max(0, 5 - currentDonations)
        },
        { status: 403 }
      );
    }

    // Get status ID for the condition
    const statusMap: { [key: string]: number } = {
      'excellent': 1,
      'good': 2,
      'acceptable': 3,
      'to-repair': 4
    };
    const statusId = statusMap[condition] || 2;

    // Insert donation
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO donations (name, email, region, hardware_type, quantity, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, region, hardwareType, quantity, statusId]
    );

    // Update or insert IP donation count
    if (ipRows.length > 0) {
      await pool.query(
        'UPDATE `ip-limit-donations` SET `number-donations` = ? WHERE ip = ?',
        [newTotal, clientIp]
      );
    } else {
      await pool.query(
        'INSERT INTO `ip-limit-donations` (ip, `number-donations`) VALUES (?, ?)',
        [clientIp, quantity]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Don enregistré avec succès',
      donationId: result.insertId,
      currentDonations: newTotal,
      remainingSlots: 5 - newTotal
    });

  } catch (error: any) {
    console.error('Donation API Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// GET: Check donation count for current IP
export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    const [ipRows] = await pool.query<RowDataPacket[]>(
      'SELECT `number-donations` FROM `ip-limit-donations` WHERE ip = ?',
      [clientIp]
    );

    const currentDonations = ipRows.length > 0 ? ipRows[0]['number-donations'] : 0;
    const remainingSlots = Math.max(0, 5 - currentDonations);

    return NextResponse.json({
      success: true,
      currentDonations,
      remainingSlots,
      limit: 5
    });

  } catch (error: any) {
    console.error('Get Donation Count Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
