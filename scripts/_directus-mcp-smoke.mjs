import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const serverPath = join(projectRoot, 'node_modules', '@staminna', 'directus-mcp-server', 'dist', 'index.js')
const child = spawn(process.execPath, [serverPath], {
  cwd: projectRoot,
  env: process.env,
  stdio: ['pipe', 'pipe', 'pipe'],
})

let nextId = 1
let stdoutBuffer = ''
const pending = new Map()
const stderr = []

child.stderr.setEncoding('utf8')
child.stderr.on('data', (chunk) => stderr.push(chunk))
child.stdout.setEncoding('utf8')
child.stdout.on('data', (chunk) => {
  stdoutBuffer += chunk
  while (stdoutBuffer.includes('\n')) {
    const newline = stdoutBuffer.indexOf('\n')
    const line = stdoutBuffer.slice(0, newline).trim()
    stdoutBuffer = stdoutBuffer.slice(newline + 1)
    if (!line) continue

    const message = JSON.parse(line)
    if (message.id != null && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(JSON.stringify(message.error)))
      else resolve(message.result)
    }
  }
})

function send(method, params) {
  const id = nextId++
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`)
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}

function notify(method, params = {}) {
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`)
}

const timeout = setTimeout(() => {
  child.kill()
  console.error(stderr.join('').slice(-4000))
  process.exit(2)
}, 30_000)

try {
  const initialized = await send('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'codex-directus-smoke', version: '1.0.0' },
  })
  notify('notifications/initialized')

  const listed = await send('tools/list', {})
  const requestedTool = process.argv[2] ?? 'list_collections'
  const toolArguments = process.argv[3] ? JSON.parse(process.argv[3]) : {}
  const called = await send('tools/call', { name: requestedTool, arguments: toolArguments })

  console.log(JSON.stringify({
    server: initialized.serverInfo,
    protocolVersion: initialized.protocolVersion,
    toolCount: listed.tools?.length ?? 0,
    tools: listed.tools?.map(({ name }) => name),
    call: called,
  }, null, 2))
} finally {
  clearTimeout(timeout)
  child.stdin.end()
  child.kill()
}
