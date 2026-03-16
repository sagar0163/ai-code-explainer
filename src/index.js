#!/usr/bin/env node

/**
 * AI Code Explainer - Main Entry Point
 * A CLI tool that explains code in plain English using AI
 */

const { Command } = require('commander');
const chalk = require('chalk');
const explainCode = require('./explainer');
const readFile = require('./utils/fileReader');
const config = require('./utils/config');

const program = new Command();

program
  .name('explain')
  .description('AI-powered CLI tool to explain code in plain English')
  .version('1.0.0');

program
  .argument('[file]', 'Code file to explain')
  .option('-l, --language <lang>', 'Programming language (auto-detected if not specified)')
  .option('-d, --detail <level>', 'Detail level: brief, normal, detailed', 'normal')
  .option('-s, --stdin', 'Read code from stdin')
  .option('--no-color', 'Disable colored output')
  .action(async (file, options) => {
    try {
      // Check for API key
      const apiKey = config.getApiKey();
      if (!apiKey) {
        console.log(chalk.yellow('⚠️  No API key found. Please set OPENAI_API_KEY in .env file.'));
        console.log(chalk.dim('   echo "OPENAI_API_KEY=your_key" > .env'));
        process.exit(1);
      }

      let code = '';

      if (options.stdin) {
        // Read from stdin
        code = await readFile.fromStdin();
        if (!code.trim()) {
          console.log(chalk.red('Error: No code provided via stdin'));
          process.exit(1);
        }
      } else if (file) {
        // Read from file
        code = await readFile.fromPath(file);
      } else {
        console.log(chalk.red('Error: Please provide a file or use --stdin flag'));
        program.help();
        process.exit(1);
      }

      // Show loading indicator
      const ora = require('ora');
      const spinner = ora('Analyzing code...').start();

      // Get explanation
      const result = await explainCode(code, {
        language: options.language,
        detailLevel: options.detail,
        apiKey
      });

      spinner.succeed('Analysis complete!');

      // Display results
      console.log(chalk.bold('\n📖 Code Explanation:\n'));
      console.log(chalk.white(result.explanation));

      if (result.suggestions && result.suggestions.length > 0) {
        console.log(chalk.bold('\n💡 Suggestions:\n'));
        result.suggestions.forEach((s, i) => {
          console.log(chalk.cyan(`   ${i + 1}. ${s}`));
        });
      }

    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Config command
program
  .command('config')
  .description('Manage configuration')
  .action(() => {
    config.showConfig();
  });

program.parse();
