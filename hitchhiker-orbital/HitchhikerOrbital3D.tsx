// HitchhikerOrbital3D.tsx — Native Framer Code Component
// Drop directly into Framer: Assets -> Code -> New Code File
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
    activeState: "orbital" | "exploded" | "scale" | "multirack"
    explodeFactor: number
    autoRotateSpeed: number
    showTelemetryHUD: boolean
    transparentBg: boolean
}

export default function HitchhikerOrbital3D(props: Props) {
    const {
        activeState = "orbital",
        explodeFactor = 0,
        autoRotateSpeed = 0.4,
        showTelemetryHUD = true,
        transparentBg = false,
    } = props

    const iframeRef = React.useRef<HTMLIFrameElement>(null)

    React.useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "HHO_SET_STATE",
                    state: activeState,
                    explode: explodeFactor,
                    speed: autoRotateSpeed,
                    hud: showTelemetryHUD,
                    transparent: transparentBg,
                },
                "*"
            )
        }
    }, [activeState, explodeFactor, autoRotateSpeed, showTelemetryHUD, transparentBg])

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                background: transparentBg ? "transparent" : "#020712",
                overflow: "hidden",
                borderRadius: 12,
            }}
        >
            <iframe
                ref={iframeRef}
                src="https://shokun123.github.io/web-demos/hitchhiker-orbital/?embed=framer"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                }}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    )
}

addPropertyControls(HitchhikerOrbital3D, {
    activeState: {
        type: ControlType.Enum,
        title: "Motion State",
        options: ["orbital", "exploded", "scale", "multirack"],
        optionTitles: [
            "1. Orbital Motion (LEO 408km)",
            "2. Exploded View (Fly-In CAD)",
            "3. Human Scale Reference (1.8m EVA)",
            "4. Multi-Rack Node Assembly",
        ],
        defaultValue: "orbital",
    },
    explodeFactor: {
        type: ControlType.Number,
        title: "Explode %",
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 0,
    },
    autoRotateSpeed: {
        type: ControlType.Number,
        title: "Orbit Speed",
        min: 0,
        max: 2,
        step: 0.1,
        defaultValue: 0.4,
    },
    showTelemetryHUD: {
        type: ControlType.Boolean,
        title: "Telemetry HUD",
        defaultValue: true,
    },
    transparentBg: {
        type: ControlType.Boolean,
        title: "Alpha BG (Deck)",
        defaultValue: false,
    },
})
