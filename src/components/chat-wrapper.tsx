"use client"

import dynamic from "next/dynamic"

const AtlasChat = dynamic(() => import("./atlas-chat").then(m => m.AtlasChat), {
    ssr: false,
    loading: () => null // Render nothing during load for minimum impact
})

export function AtlasChatWrapper() {
    return <AtlasChat />
}
