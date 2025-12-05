import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

interface PartnerData {
  organizationName: string;
  organizationType: string;
  contactName: string;
  email: string;
  phone: string;
  region: string;
  address: string;
  siret?: string;
  hardwareQuantity: number;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnerData = await request.json();
    const {
      organizationName,
      organizationType,
      contactName,
      email,
      phone,
      region,
      address,
      siret,
      hardwareQuantity,
      description
    } = body;

    // Validate required fields
    if (!organizationName || !organizationType || !contactName || !email || 
        !phone || !region || !address || !hardwareQuantity || !description) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Validate minimum quantity
    if (hardwareQuantity < 6) {
      return NextResponse.json(
        { error: 'La quantité minimale pour les partenaires est de 6 unités' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existingPartner] = await pool.query(
      'SELECT id FROM partners WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingPartner) && existingPartner.length > 0) {
      return NextResponse.json(
        { error: 'Un partenariat existe déjà avec cet email' },
        { status: 409 }
      );
    }

    // Insert partner (status = 1 for 'pending')
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO partners 
       (organization_name, organization_type, contact_name, email, phone, region, address, siret, hardware_quantity, description, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        organizationName,
        organizationType,
        contactName,
        email,
        phone,
        region,
        address,
        siret || null,
        hardwareQuantity,
        description
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Demande de partenariat envoyée avec succès',
      partnerId: result.insertId
    });

  } catch (error: any) {
    console.error('Partner API Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// GET: Get all partners (admin only - add auth check later)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = `
      SELECT p.*, ps.name as status_name 
      FROM partners p 
      LEFT JOIN \`partner-status\` ps ON p.status = ps.id
    `;

    const params: any[] = [];

    if (status) {
      query += ' WHERE p.status = ?';
      params.push(parseInt(status));
    }

    query += ' ORDER BY p.created_at DESC';

    const [partners] = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      partners
    });

  } catch (error: any) {
    console.error('Get Partners Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
