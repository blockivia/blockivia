export const CONTRACT_ADDRESS = '0xaC8d8bc54DE862cdc9e0cbB0eff97384E3c506dC' as `0x${string}`

export const CONTRACT_ABI = [
  {
    name: 'reclamado',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'reclamar',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const