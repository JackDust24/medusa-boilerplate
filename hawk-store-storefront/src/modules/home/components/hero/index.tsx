"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const Hero = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenParamExists = searchParams.has("token")
  const token = searchParams.get("token")
  const returnUrl = searchParams.get("returnUrl")

  const handleCheckout = () => {
    if (returnUrl) {
      window.location.href = returnUrl as string
    }
  }

  useEffect(() => {
    // Case 1: If search params include `token` but it's empty
    if (tokenParamExists && (!token || token.trim() === "")) {
      alert("No token provided")
    }

    // Case 2: If no search params at all — do nothing
  }, [searchParams])

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            Hawk Store
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            Testing the ability to deploy a Medusa Storefront
          </Heading>
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
        >
          <Button variant="secondary">
            View on GitHub
            <Github />
          </Button>
        </a>
        {tokenParamExists && token && (
          <>
            <p>Simulated token: {token}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
            >
              Finish Purchase
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Hero
