/**
 * AI Code Explainer - Explainer Module
 * Handles communication with AI API to explain code
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate prompt based on detail level
 */
function generatePrompt(code, language, detailLevel) {
  const detailInstructions = {
    brief: 'Provide a brief one-paragraph summary of what this code does.',
    normal: 'Explain what this code does in a clear, concise manner. Include the main purpose and key logic.',
    detailed: 'Provide a detailed explanation of what this code does. Include: 1) Overall purpose 2) How it works step by step 3) Any important patterns or techniques used 4) Potential improvements or concerns.'
  };

  const instruction = detailInstructions[detailLevel] || detailInstructions.normal;

  return `You are a code explainer. Given the following ${language || 'programming'} code, ${instruction}

Code:
\`\`\`
${code}
\`\`\`

Provide your explanation in plain English that a developer can understand.`;
}

/**
 * Call OpenAI API to get code explanation
 */
async function callAI(prompt, apiKey) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code explainer. Your explanations are clear, accurate, and beginner-friendly.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get explanation from AI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Detect programming language from code
 */
function detectLanguage(code, filename) {
  // Extension-based detection
  if (filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const langMap = {
      'js': 'JavaScript',
      'jsx': 'JavaScript (React)',
      'ts': 'TypeScript',
      'tsx': 'TypeScript (React)',
      'py': 'Python',
      'rb': 'Ruby',
      'java': 'Java',
      'c': 'C',
      'cpp': 'C++',
      'go': 'Go',
      'rs': 'Rust',
      'php': 'PHP',
      'swift': 'Swift',
      'kt': 'Kotlin',
      'scala': 'Scala',
      'sh': 'Shell',
      'bash': 'Bash',
      'sql': 'SQL',
      'html': 'HTML',
      'css': 'CSS',
      'json': 'JSON',
      'xml': 'XML',
      'yaml': 'YAML',
      'yml': 'YAML',
      'md': 'Markdown'
    };
    if (langMap[ext]) return langMap[ext];
  }

  // Code-based detection
  const patterns = [
    { lang: 'Python', pattern: /^(def |class |import |from |if __name__|print\()/m },
    { lang: 'JavaScript', pattern: /(const |let |function |=>|require\(|import .+ from)/m },
    { lang: 'TypeScript', pattern: /(interface |type |: string|: number|: boolean|<T>)/m },
    { lang: 'Java', pattern: /(public class|private |System\.out\.|import java\.)/m },
    { lang: 'C#', pattern: /(using |namespace |public class|Console\.Write)/m },
    { lang: 'Go', pattern: /(func |package |import \(|fmt\.)/m },
    { lang: 'Rust', pattern: /(fn |let mut |impl |pub fn|use std::)/m },
    { lang: 'Ruby', pattern: /(def |end$|puts |require |class |module )/m },
    { lang: 'PHP', pattern: /<\?php|\$[a-zA-Z]/m },
    { lang: 'Shell', pattern: /^#!/m },
    { lang: 'SQL', pattern: /(SELECT |INSERT |UPDATE |CREATE TABLE|DELETE FROM)/im }
  ];

  for (const { lang, pattern } of patterns) {
    if (pattern.test(code)) return lang;
  }

  return 'programming language';
}

/**
 * Main function to explain code
 */
async function explainCode(code, options = {}) {
  const { language, detailLevel = 'normal', apiKey } = options;

  // Detect or use provided language
  const detectedLang = language || detectLanguage(code);

  // Generate prompt
  const prompt = generatePrompt(code, detectedLang, detailLevel);

  // Get explanation from AI
  const explanation = await callAI(prompt, apiKey);

  // Generate suggestions for detailed mode
  let suggestions = [];
  if (detailLevel === 'detailed') {
    const suggestionPrompt = `Based on this ${detectedLang} code, provide 3-5 suggestions for improvements, best practices, or potential issues. Format as a numbered list.

Code:
\`\`\`
${code}
\`\`\``;

    try {
      const suggestionResponse = await callAI(suggestionPrompt, apiKey);
      suggestions = suggestionResponse.split('\n').filter(s => s.trim());
    } catch (e) {
      // Ignore suggestion errors
    }
  }

  return {
    explanation,
    suggestions,
    language: detectedLang
  };
}

module.exports = { explainCode, detectLanguage };
