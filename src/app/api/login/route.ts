import { NextRequest, NextResponse } from 'next/server';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'nird2025!Admin',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Check credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(
        `${username}:${Date.now()}:${Math.random()}`
      ).toString('base64');

      return NextResponse.json(
        {
          success: true,
          token,
          message: 'Connexion réussie',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Identifiants incorrects',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur serveur',
      },
      { status: 500 }
    );
  }
}
