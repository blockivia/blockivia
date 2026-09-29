'use client'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contract'
export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract, isPending } = useWriteContract()

  const { data: yaReclamado, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'reclamado',
    args: address ? [address] : undefined,
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border border-teal-500/30 bg-slate-900/60 p-8 rounded-2xl backdrop-blur">
        <h1 className="text-3xl font-bold text-white mb-2">Blockivia</h1>
        <p className="text-slate-400 text-sm mb-6">Misión: Reclama tu certificado del taller.</p>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl transition"
          >
            Conectar MetaMask
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 truncate">Wallet: {address}</p>
            {yaReclamado ? (
              <div className="p-3 bg-teal-950/50 border border-teal-500/50 rounded-xl text-teal-300 font-medium">
                ✓ Certificado reclamado con éxito
              </div>
            ) : (
              <button
                onClick={() =>
                  writeContract(
                    { address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'reclamar' },
                    { onSuccess: () => refetch() }
                  )
                }
                disabled={isPending}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-semibold rounded-xl transition"
              >
                {isPending ? 'Confirmando en blockchain...' : 'Reclamar Certificado'}
              </button>
            )}
            <button
              onClick={() => disconnect()}
              className="text-xs text-slate-500 hover:text-slate-300 underline block mx-auto"
            >
              Desconectar
            </button>
          </div>
        )}
      </div>
    </main>
  )
}