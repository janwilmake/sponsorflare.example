# Calculator API

A simple calculator API implementing basic arithmetic operations.

## Endpoints

- `/add/x/y` - Adds two numbers
- `/subtract/x/y` - Subtracts y from x
- `/multiply/x/y` - Multiplies two numbers
- `/divide/x/y` - Divides x by y

## Example Usage

```bash
# Addition
curl https://calc-api-123.workers.dev/add/5/3
# {"operation":"add","x":5,"y":3,"result":8}

# Subtraction
curl https://calc-api-123.workers.dev/subtract/10/4
# {"operation":"subtract","x":10,"y":4,"result":6}

# Multiplication
curl https://calc-api-123.workers.dev/multiply/6/7
# {"operation":"multiply","x":6,"y":7,"result":42}

# Division
curl https://calc-api-123.workers.dev/divide/15/3
# {"operation":"divide","x":15,"y":3,"result":5}