# Business Requirements Document (BRD): AI Code Explainer

## 1. Project Overview

**Project Name:** AI Code Explainer  
**Type:** CLI Tool  
**Core Functionality:** A command-line interface tool that uses OpenAI's GPT models to explain code in plain English, helping developers understand unfamiliar codebases quickly.

**Target Users:** Software developers, students learning programming, code reviewers, and technical writers who need to understand or document code.

---

## 2. Features

### Core Features
- **AI-Powered Code Explanation:** Uses OpenAI GPT models to generate human-readable explanations of code
- **Multi-Language Support:** Supports 20+ programming languages with automatic detection
- **Flexible Input Methods:** Read code from files or stdin (pipe from other commands)
- **Detail Levels:** Three explanation levels - brief, normal, and detailed
- **Command-Line Interface:** User-friendly CLI with colored output and progress indicators

### Technical Features
- Environment variable or .env file configuration for API keys
- Automatic language detection from file extension
- Syntax-aware processing
- Non-blocking async API calls with loading spinners

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js |
| **Package Manager** | npm |
| **CLI Framework** | Commander.js |
| **AI Provider** | OpenAI API (GPT models) |
| **UI/Output** | Chalk (colored output), Ora (spinners) |
| **Configuration** | Dotenv |
| **Testing** | Jest |
| **Language** | JavaScript |

---

## 4. User Stories

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US1 | As a developer, I want to explain a code file by passing its path | Tool reads file and returns explanation |
| US2 | As a developer, I want to pipe code from another command | Tool accepts stdin input and explains it |
| US3 | As a user, I want to specify the programming language | Tool uses specified language for context |
| US4 | As a user, I want different detail levels | Tool provides brief/normal/detailed output |
| US5 | As a user, I want easy API key setup | Tool supports .env file or environment variable |

---

## 5. Requirements

### Functional Requirements
- FR1: Accept file path as CLI argument and read file contents
- FR2: Accept stdin input via pipe or here-doc
- FR3: Detect programming language from file extension
- FR4: Allow manual language override via --language flag
- FR5: Call OpenAI API with code and language context
- FR6: Display explanation with appropriate formatting
- FR7: Support three detail levels: brief, normal, detailed
- FR8: Load API key from .env file or environment variable

### Non-Functional Requirements
- NFR1: Response time < 30 seconds for typical code files
- NFR2: Support code files up to 100KB
- NFR3: Handle API errors gracefully with user-friendly messages
- NFR4: Work on macOS, Linux, and Windows

---

## 6. Future Enhancements

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| FE1 | Support for local AI models (Ollama, LM Studio) | High |
| FE2 | Explain entire directories recursively | Medium |
| FE3 | Generate documentation in Markdown format | Medium |
| FE4 | Save explanation history | Low |
| FE5 | Support for code diff explanations | Low |
| FE6 | Syntax highlighting in output | Low |
| FE7 | Batch processing multiple files | Low |
| FE8 | Customizable prompt templates | Low |

---

*Document Version: 1.0*  
*Created: 2026-03-17*
