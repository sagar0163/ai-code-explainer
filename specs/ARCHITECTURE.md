# Architecture Document: AI Code Explainer

## 1. System Overview

AI Code Explainer is a Node.js CLI application that leverages OpenAI's GPT models to provide intelligent code explanations. The system follows a simple, modular architecture designed for ease of use and maintainability.

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLI Entry Point                         │
│                      (src/index.js)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   Command Handler                           │
│              (Commander.js CLI parsing)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ File Read │ │ Stdin    │ │ Config   │
    │ Module    │ │ Reader   │ │ Loader   │
    └──────────┘ └──────────┘ └──────────┘
          │           │           │
          └───────────┼───────────┘
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Core Engine                                │
│                  (src/explainer.js)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  - Code Processing                                    │  │
│  │  - Language Detection                                 │  │
│  │  - Prompt Construction                                │  │
│  │  - API Communication                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  External Services                          │
│                   (OpenAI API)                              │
└─────────────────────────────────────────────────────────────┘
```

## 3. Component Design

### 3.1 Entry Point (src/index.js)
- Initializes Commander.js CLI
- Parses command-line arguments
- Handles help/version flags
- Routes to appropriate handler

### 3.2 Command Handler
- Validates input (file path or stdin)
- Loads configuration (.env)
- Coordinates between input reader and explainer engine
- Formats and displays output

### 3.3 Input Module (src/utils/)
- **fileReader.js**: Reads code files from filesystem
- **stdinReader.js**: Handles piped input from stdin
- **languageDetector.js**: Detects programming language from extension

### 3.4 Core Engine (src/explainer.js)
- Constructs prompts for OpenAI API
- Manages API calls with error handling
- Processes and formats responses
- Handles different detail levels (brief/normal/detailed)

### 3.5 Configuration Module
- Loads .env file using Dotenv
- Fallback to environment variables
- Validates API key presence

## 4. Data Flow

```
User Input (CLI args/stdin)
         │
         ▼
    ┌────────────┐
    │ Validation │ ───▶ Error Messages
    └────────────┘
         │
         ▼
    ┌────────────┐
    │   Parser   │ ───▶ Language Detection
    └────────────┘
         │
         ▼
    ┌────────────┐
    │  Prompter  │ ───▶ Construct OpenAI Prompt
    └────────────┘
         │
         ▼
    ┌────────────┐
    │ API Client │ ───▶ OpenAI API Call
    └────────────┘
         │
         ▼
    ┌────────────┐
    │  Formatter │ ───▶ Color Output (Chalk)
    └────────────┘
         │
         ▼
    Display to User
```

## 5. API Integration

### OpenAI API
- **Endpoint:** `https://api.openai.com/v1/chat/completions`
- **Model:** gpt-3.5-turbo (default)
- **Prompt Structure:**
  ```
  Explain the following {language} code in {detail_level} detail:
  
  ```{language}
  {code_content}
  ```
  ```

## 6. Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| OPENAI_API_KEY | Yes | OpenAI API key for authentication |

## 7. Error Handling

| Error Type | Handling |
|------------|----------|
| Missing API Key | Display setup instructions |
| File Not Found | Show file path error |
| Invalid Language | Fallback to "plain text" |
| API Rate Limit | Display retry message |
| API Error | Show error message from API |

## 8. File Structure

```
ai-code-explainer/
├── src/
│   ├── index.js          # Entry point
│   ├── explainer.js      # Core engine
│   └── utils/
│       ├── fileReader.js
│       ├── stdinReader.js
│       └── languageDetector.js
├── examples/             # Example code files
├── specs/                # This documentation
├── package.json
├── .env.example
└── README.md
```

## 9. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| commander | ^11.1.0 | CLI argument parsing |
| chalk | ^4.1.2 | Colored terminal output |
| ora | ^5.4.1 | Loading spinners |
| dotenv | ^16.3.1 | Environment configuration |
| openai | (built-in) | HTTP client for API calls |

---

*Document Version: 1.0*  
*Created: 2026-03-17*
