# AI Code Explainer 🧠

> A CLI tool that explains code in plain English using AI

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-code-explainer.git
cd ai-code-explainer

# Install dependencies
npm install

# Make executable
chmod +x src/index.js
```

## Setup

1. **Get an OpenAI API Key**: Visit [OpenAI API](https://platform.openai.com/api-keys)

2. **Set up the API Key** (choose one method):

   ```bash
   # Method 1: Create .env file
   echo "OPENAI_API_KEY=sk-..." > .env

   # Method 2: Set environment variable
   export OPENAI_API_KEY=sk-...
   ```

## Usage

### Explain a file

```bash
# Basic usage
node src/index.js path/to/code.js

# Specify language
node src/index.js path/to/code.py --language python

# Detailed explanation with suggestions
node src/index.js path/to/code.js --detail detailed
```

### Explain from stdin

```bash
# Pipe code from another command
cat myfile.js | node src/index.js --stdin

# Or use here-doc
node src/index.js --stdin << 'EOF'
function hello() {
  console.log("Hello World");
}
EOF
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --language <lang>` | Programming language | Auto-detected |
| `-d, --detail <level>` | Detail level: brief, normal, detailed | normal |
| `-s, --stdin` | Read code from stdin | false |
| `--no-color` | Disable colored output | false |

## Examples

```bash
# Explain a JavaScript function
node src/index.js examples/fetch.js

# Explain Python code with detailed analysis
node src/index.js examples/basic.py --detail detailed

# Quick brief explanation
node src/index.js examples/hello.go --detail brief
```

## Features

- 🤖 **AI-Powered**: Uses OpenAI GPT to explain code
- 🌐 **Multi-Language**: Supports 20+ programming languages
- 📝 **Multiple Detail Levels**: Choose brief, normal, or detailed explanations
- 🔄 **Flexible Input**: Read from files or stdin
- 🎨 **Colorful Output**: Easy to read with syntax highlighting

## Example Output

```bash
$ node src/index.js examples/basic.py

🔄 Analyzing code...
✅ Analysis complete!

📖 Code Explanation:

This Python code defines a function called calculate_factorial that computes 
the factorial of a given number using recursion. 

The function takes one parameter n and returns the factorial value. It uses 
recursive logic where:
1. If n is 0 or 1, it returns 1 (base case)
2. Otherwise, it multiplies n by the factorial of n-1 (recursive case)

For example, factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

## License

MIT
