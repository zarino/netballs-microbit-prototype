let team: number = 0
let teams: string[] = ["c", "m", "y", "p"]

radio.setGroup(1)

input.onButtonPressed(Button.A, () => {
    team = Math.max(team - 1, 0)
})

input.onButtonPressed(Button.B, () => {
    team = Math.min(team + 1, teams.length - 1)
})

basic.forever(() => {
    basic.showString(teams[team])
    basic.pause(100)
})

basic.forever(() => {
    radio.sendString(teams[team])
})
