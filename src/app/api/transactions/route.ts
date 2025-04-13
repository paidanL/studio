import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('POST request received at /api/transactions');
    const { amount, date, type, description } = await req.json();
    console.log('Request body:', { amount, date, type, description });

    const { spawn } = require('child_process');
    const pythonProcess = spawn('python3', ['src/lib/database.py', 'create', amount, date, type, description]);

    let result = "";
    let error = "";

    for await (const chunk of pythonProcess.stdout) {
        result += chunk;
    }

    for await (const chunk of pythonProcess.stderr) {
        error += chunk;
    }

    console.log('Python script output:', result);
    console.error('Python script errors:', error);

    if (error) {
        return NextResponse.json({ error: `Python script error: ${error}` }, { status: 500 });
    }

    try {
        const response = JSON.parse(result);
        return NextResponse.json({ id: response.id });
    } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        return NextResponse.json({ error: `Failed to parse JSON response from Python script: ${parseError}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST /api/transactions:', error);
    return NextResponse.json({ error: `Error processing request: ${error.message}` }, { status: 500 });
  }
}