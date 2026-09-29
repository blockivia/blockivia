'use client'

import { useState, useEffect } from 'react'
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import { CONTRACT_ADDRESS as contractAddress } from '@/contract'

const ABI = [
  {
    name: 'claimCertificate',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [descargando, setDescargando] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: hash, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const yaReclamado = Boolean((balance && Number(balance) > 0) || isConfirmed)

  const handleReclamar = () => {
    writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'claimCertificate',
    })
  }

  // Convierte el SVG a imagen PNG en alta definición (1200 x 1840 px)
  const handleDescargarPNG = async () => {
    try {
      setDescargando(true)

      const res = await fetch('/certificado.svg')
      const svgText = await res.text()

      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 1200
        canvas.height = 1840
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, 1200, 1840)
          const pngUrl = canvas.toDataURL('image/png')

          const link = document.createElement('a')
          link.href = pngUrl
          link.download = 'Certificado_BlockivIA.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
        URL.revokeObjectURL(url)
        setDescargando(false)
      }

      img.onerror = () => {
        setDescargando(false)
        const fallback = document.createElement('a')
        fallback.href = '/certificado.svg'
        fallback.download = 'Certificado_BlockivIA.svg'
        fallback.click()
      }

      img.src = url
    } catch (e) {
      console.error(e)
      setDescargando(false)
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[#0d111a] border border-neutral-800 rounded-2xl p-6 text-center shadow-xl">
          <h1 className="text-2xl font-bold mb-2 text-teal-400">Certificados</h1>
          <p className="text-neutral-400 text-sm mb-6">Misión: Reclama tu certificado del taller.</p>
          <div className="w-full py-3 px-4 rounded-xl bg-neutral-800 text-neutral-400 font-semibold animate-pulse">
            Cargando...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg bg-[#0d111a] border border-neutral-800 rounded-2xl p-6 text-center shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-teal-400">Certificados</h1>
          <p className="text-neutral-400 text-sm">Misión: Reclama tu certificado del taller.</p>
        </div>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-black font-semibold transition"
          >
            Conectar Wallet
          </button>
        ) : (
          <div className="space-y-5">
            <p className="text-xs text-neutral-400 truncate">Wallet: {address}</p>

            {yaReclamado ? (
              <div className="space-y-4">
                <div className="w-full py-2.5 px-4 rounded-xl border border-teal-500/40 bg-teal-950/20 text-teal-300 font-medium text-sm">
                  ✓ Certificado reclamado con éxito
                </div>

                {/* Previsualización del certificado */}
                <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#070a10] p-1 shadow-2xl">
                  <img 
                    src="/certificado.svg" 
                    alt="Certificado BlockivIA" 
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>

                {/* Botón principal: Descarga directa en formato PNG para redes */}
                <button
                  onClick={handleDescargarPNG}
                  disabled={descargando}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-semibold transition shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {descargando ? 'Generando PNG...' : 'Descargar Certificado (PNG)'}
                </button>

                <a
                  href="/certificado.svg"
                  download="Certificado_BlockivIA.svg"
                  className="text-xs text-neutral-400 hover:text-teal-300 underline block mx-auto pt-1"
                >
                  O descargar archivo vectorial (SVG)
                </a>
              </div>
            ) : (
              <button
                onClick={handleReclamar}
                disabled={isPending || isConfirming}
                className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-semibold transition"
              >
                {isConfirming
                  ? 'Confirmando en blockchain...'
                  : isPending
                  ? 'Confirma en MetaMask...'
                  : 'Reclamar Certificado'}
              </button>
            )}

            <button
              onClick={() => disconnect()}
              className="text-xs text-neutral-500 hover:text-neutral-300 underline block mx-auto pt-1"
            >
              Desconectar
            </button>
          </div>
        )}
      </div>
    </main>
  )
}