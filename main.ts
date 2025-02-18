export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Helper to validate and parse number parameters
    const parseParams = (x: string | null, y: string | null): { x: number, y: number } | null => {
      if (!x || !y) return null;
      const numX = Number(x);
      const numY = Number(y);
      if (isNaN(numX) || isNaN(numY)) return null;
      return { x: numX, y: numY };
    };

    // Extract operation and parameters from URL path
    const match = path.match(/^\/(\w+)\/(-?\d*\.?\d*)\/(-?\d*\.?\d*)$/);
    if (!match) {
      return new Response('Invalid path. Use format: /{operation}/{x}/{y}', { status: 400 });
    }

    const [, operation, x, y] = match;
    const numbers = parseParams(x, y);

    if (!numbers) {
      return new Response('Invalid numbers provided', { status: 400 });
    }

    try {
      let result: number;
      
      switch (operation) {
        case 'add':
          result = numbers.x + numbers.y;
          break;
        case 'subtract':
          result = numbers.x - numbers.y;
          break;
        case 'multiply':
          result = numbers.x * numbers.y;
          break;
        case 'divide':
          if (numbers.y === 0) {
            return new Response('Division by zero is not allowed', { status: 400 });
          }
          result = numbers.x / numbers.y;
          break;
        default:
          return new Response('Invalid operation. Use: add, subtract, multiply, or divide', { status: 400 });
      }

      return new Response(JSON.stringify({
        operation,
        x: numbers.x,
        y: numbers.y,
        result
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response('Internal server error', { status: 500 });
    }
  }
};