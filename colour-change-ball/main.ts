let strip: neopixel.Strip = null
let teams: string[] = ["c", "m", "y", "p"]
let strengths: number[] = [-256, -256, -256, -256]
let colours: number[] = [
    neopixel.hsl(195, 75, 40),
    neopixel.hsl(340, 100, 50),
    neopixel.hsl(40, 100, 50),
    neopixel.hsl(250, 80, 50)
]
let currentColour: number = neopixel.rgb(255, 0, 0)

function getStrongestTeam(): string {
    let strongestSignal = -256
    let strongestPosition = 0
    for (let i=0; i < strengths.length; i++) {
        if (strengths[i] > strongestSignal) {
            strongestSignal = strengths[i]
            strongestPosition = i
        }
    }
    return teams[ strongestPosition ]
}

function getTeamColour(teamName: string): number {
    return colours[ teams.indexOf(teamName) ]
}

strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
strip.setBrightness(255)

radio.setGroup(1)

radio.onDataPacketReceived( ({ receivedString }) => {
    let i = teams.indexOf(receivedString)
    strengths[i] = radio.receivedSignalStrength()
})

basic.forever(() => {
    basic.pause(200)
    let strongestTeam = getStrongestTeam()
    basic.showString( strongestTeam )
    strip.showColor( getTeamColour(strongestTeam) )
    strengths = [-256, -256, -256, -256]
})
