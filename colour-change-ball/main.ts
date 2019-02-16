let group: number = 1
let strip: neopixel.Strip = null
let hue: number = 180

strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
strip.setBrightness(255)

radio.setGroup(group)

radio.onDataPacketReceived( ({ receivedNumber }) => {
    hue = Math.map(
        radio.receivedSignalStrength(),
        -128,
        -42,
        0,
        360
    )
})

input.onButtonPressed(Button.A, () => {
    group = Math.max(group - 1, 0)
    radio.setGroup(group)
})

input.onButtonPressed(Button.B, () => {
    group = Math.min(group + 1, 255)
    radio.setGroup(group)
})

basic.forever(() => {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showNumber(group)
    basic.pause(500)
})

basic.forever(() => {
    strip.showColor( neopixel.hsl(hue, 100, 50) )
})
