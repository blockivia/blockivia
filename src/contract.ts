export const CONTRACT_ADDRESS = '0xe7992fEc987B2Ab29EA79C42500A9C8A37E00259' as `0x${string}`

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