/**
 * Acadex LMS - Unified Full-Stack Runner
 * Spawns both the Backend API / Static Server (port 5000)
 * and the React + Vite Frontend (port 5173) concurrently.
 */
const { spawn } = require('child_process');

console.log('=======================================================');
console.log('🚀 STARTING ACADEX LMS FULL-STACK ENVIRONMENT');
console.log('📡 Server & Portals : http://localhost:5000');
console.log('⚡ React Vite Client : http://localhost:5173');
console.log('=======================================================\n');

const server = spawn('node server/server.js', {
  shell: true,
  stdio: 'inherit'
});

const client = spawn('npm --prefix client run dev', {
  shell: true,
  stdio: 'inherit'
});

function handleExit() {
  if (server && !server.killed) server.kill();
  if (client && !client.killed) client.kill();
  process.exit(0);
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
process.on('exit', handleExit);
