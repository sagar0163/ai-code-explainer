/**
 * Configuration Utility
 * Manages API keys and settings
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const CONFIG_FILE = '.env';
const CONFIG_KEYS = ['OPENAI_API_KEY'];

/**
 * Get config file path
 */
function getConfigPath() {
  // Check current directory first, then home directory
  const cwd = process.cwd();
  const homeDir = require('os').homedir();
  
  const cwdConfig = path.join(cwd, CONFIG_FILE);
  const homeConfig = path.join(homeDir, '.ai-code-explainer.env');
  
  if (fs.existsSync(cwdConfig)) {
    return cwdConfig;
  }
  return homeConfig;
}

/**
 * Load configuration from .env file
 */
function loadConfig() {
  const configPath = getConfigPath();
  const config = {};
  
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmed.substring(0, equalIndex).trim();
        const value = trimmed.substring(equalIndex + 1).trim();
        config[key] = value;
      }
    }
  }
  
  return config;
}

/**
 * Get API key from config or environment
 */
function getApiKey() {
  // First check environment variable
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }
  
  // Then check config file
  const config = loadConfig();
  return config.OPENAI_API_KEY;
}

/**
 * Show current configuration
 */
function showConfig() {
  const configPath = getConfigPath();
  const hasApiKey = !!getApiKey();
  
  console.log(chalk.bold('\n⚙️  AI Code Explainer Configuration\n'));
  console.log(`Config file: ${chalk.cyan(configPath)}`);
  console.log(`API Key: ${hasApiKey ? chalk.green('✓ Configured') : chalk.red('✗ Not set')}`);
  
  if (!hasApiKey) {
    console.log(chalk.yellow('\nTo set up:'));
    console.log(`  echo "OPENAI_API_KEY=your_key" > ${CONFIG_FILE}`);
    console.log(chalk.dim('  Or set environment variable: export OPENAI_API_KEY=your_key'));
  }
  
  console.log();
}

/**
 * Save configuration
 */
function saveConfig(key, value) {
  const configPath = getConfigPath();
  let config = {};
  
  // Load existing config
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex > 0) {
        const k = trimmed.substring(0, equalIndex).trim();
        const v = trimmed.substring(equalIndex + 1).trim();
        config[k] = v;
      }
    }
  }
  
  // Update config
  config[key] = value;
  
  // Write back to file
  const lines = Object.entries(config).map(([k, v]) => `${k}=${v}`);
  fs.writeFileSync(configPath, lines.join('\n') + '\n');
}

module.exports = { getApiKey, showConfig, saveConfig, loadConfig };
