import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    // Get total donations count
    const [donationsResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM donations'
    );
    const totalDonations = donationsResult[0]?.total || 0;

    // Get donations by region
    const [regionStats] = await pool.query<RowDataPacket[]>(
      `SELECT 
        region,
        COUNT(*) as count,
        SUM(quantity) as total_quantity
       FROM donations 
       GROUP BY region`
    );

    // Get donations by hardware type
    const [hardwareStats] = await pool.query<RowDataPacket[]>(
      `SELECT 
        hardware_type,
        COUNT(*) as count,
        SUM(quantity) as total_quantity
       FROM donations 
       GROUP BY hardware_type`
    );

    // Get donations by status/condition
    const [statusStats] = await pool.query<RowDataPacket[]>(
      `SELECT 
        ds.name as status_name,
        COUNT(*) as count,
        SUM(d.quantity) as total_quantity
       FROM donations d
       LEFT JOIN \`donations-status\` ds ON d.status = ds.id
       GROUP BY ds.name, ds.id`
    );

    // Get total partners
    const [partnersResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM partners WHERE status = 2' // approved partners
    );
    const totalPartners = partnersResult[0]?.total || 0;

    // Get pending partners
    const [pendingResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM partners WHERE status = 1' // pending partners
    );
    const pendingPartners = pendingResult[0]?.total || 0;

    // Get total hardware units donated
    const [unitsResult] = await pool.query<RowDataPacket[]>(
      'SELECT SUM(quantity) as total FROM donations'
    );
    const totalUnits = unitsResult[0]?.total || 0;

    // Calculate schools reached (mock calculation based on units: 1 school per 3 units)
    const schoolsReached = Math.floor(totalUnits / 3);

    return NextResponse.json({
      success: true,
      stats: {
        totalDonations,
        totalUnits,
        totalPartners,
        pendingPartners,
        schoolsReached,
        byRegion: regionStats,
        byHardwareType: hardwareStats,
        byCondition: statusStats,
      }
    });

  } catch (error: any) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
