import { NextResponse } from 'next/server';

let orders: any[] = []; // This will be replaced by a database in a real application

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const file = formData.get('file') as File | null;

    if (file) {
      // In a real application, you would save the file to a storage service
      // and store its reference in a database along with other order details.
    }
      // In a real application, you would save the file to a storage service
      // and store its reference in a database along with other order details.
    }

    const newOrder = {
      id: (orders.length + 1).toString().padStart(3, '0'),
      user: name,
      email: email,
      message: message,
      file: file ? { name: file.name, type: file.type, size: file.size } : null,
      status: 'Pendente',
      date: new Date().toISOString().split('T')[0],
    };
    orders.push(newOrder);

    return new NextResponse(JSON.stringify({ message: 'Order received successfully!', order: newOrder }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing order request:', error);
    return new NextResponse(JSON.stringify({ message: 'Error processing order request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}