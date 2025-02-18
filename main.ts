export interface Env {}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Extract operation and numbers from path
    const parts = path.split('/').filter(part => part !== '');
    if (parts.length !== 3) {
      return new Response('Invalid path. Use /operation/x/y format', { status: 400 });
    }

    const [operation, xStr, yStr] = parts;
    
    // Parse numbers
    const x = Number(xStr);
    const y = Number(yStr);

    // Validate numbers
    if (isNaN(x) || isNaN(y)) {
      return new Response('Invalid numbers provided', { status: 400 });
    }

    let result: number;

    // Perform calculation based on operation
    switch (operation) {
      case 'add':
        result = x + y;
        break;
      case 'subtract':
        result = x - y;
        break;
      case 'multiply':
        result = x * y;
        break;
      case 'divide':
        if (y === 0) {
          return new Response('Division by zero is not allowed', { status: 400 });
        }
        result = x / y;
        break;
      default:
        return new Response('Invalid operation. Use add, subtract, multiply, or divide', { status: 400 });
    }

    // Return result as JSON
    return Response.json({
      operation,
      x,
      y,
      result
    });
  },
};