# Example: Basic Python
def calculate_factorial(n):
    """Calculate factorial using recursion"""
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

# Calculate factorial of 5
result = calculate_factorial(5)
print(f"Factorial of 5 is: {result}")

# Using a class
class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, x, y):
        self.result = x + y
        return self.result
    
    def multiply(self, x, y):
        self.result = x * y
        return self.result

# Usage
calc = Calculator()
print(f"5 + 3 = {calc.add(5, 3)}")
print(f"4 * 7 = {calc.multiply(4, 7)}")
