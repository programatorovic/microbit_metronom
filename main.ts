/**
 * Advanced Metronome
 * BBC micro:bit
 */

//% color=#3366CC icon="\uf001"
//% block="Metronome"
namespace metronome {

    const EVENT_ID = 9000
    const TAP_TIMEOUT = 2000

    let running = false
    let sessionId = 0

    let accentFrequency = 2000
    let beatFrequency = 1000

    let ledEnabled = true

    let currentBeat = 0
    let currentBpm = 120

    let tapTimes: number[] = []

    //% block="start metronome BPM %bpm beats %beats note %noteValue"
    //% bpm.defl=120
    //% beats.defl=4
    export function start(
        bpm: number,
        beats: number,
        noteValue: NoteValue
    ): void {

        stop()

        currentBpm = bpm

        running = true
        sessionId++

        let mySession = sessionId

        control.inBackground(function () {

            while (running && mySession == sessionId) {

                let quarter = 60000 / bpm
                let duration = quarter * (4 / noteValue)

                for (let beat = 1; beat <= beats; beat++) {

                    if (!running)
                        return

                    if (mySession != sessionId)
                        return

                    currentBeat = beat

                    control.raiseEvent(
                        EVENT_ID,
                        beat
                    )

                    if (ledEnabled) {

                        basic.clearScreen()

                        let x = (beat - 1) % 5

                        if (beat == 1) {
                            led.plotBrightness(
                                x,
                                2,
                                255
                            )
                        } else {
                            led.plotBrightness(
                                x,
                                2,
                                80
                            )
                        }
                    }

                    if (beat == 1) {

                        music.playTone(
                            accentFrequency,
                            80
                        )

                        basic.pause(
                            Math.max(1, duration - 80)
                        )

                    } else {

                        music.playTone(
                            beatFrequency,
                            40
                        )

                        basic.pause(
                            Math.max(1, duration - 40)
                        )
                    }
                }
            }
        })
    }

    //% block="stop metronome"
    export function stop(): void {

        running = false

        sessionId++

        music.stopAllSounds()

        basic.clearScreen()
    }

    //% block="restart metronome BPM %bpm beats %beats note %noteValue"
    export function restart(
        bpm: number,
        beats: number,
        noteValue: NoteValue
    ): void {

        stop()

        basic.pause(50)

        start(
            bpm,
            beats,
            noteValue
        )
    }

    //% block="metronome running"
    export function isRunning(): boolean {

        return running
    }

    //% block="current beat"
    export function getCurrentBeat(): number {

        return currentBeat
    }

    //% block="current BPM"
    export function getCurrentBpm(): number {

        return currentBpm
    }

    //% block="set LED metronome %enabled"
    export function setLedDisplay(
        enabled: boolean
    ): void {

        ledEnabled = enabled
    }

    //% block="set accent frequency %hz"
    export function setAccentFrequency(
        hz: number
    ): void {

        accentFrequency = hz
    }

    //% block="set beat frequency %hz"
    export function setBeatFrequency(
        hz: number
    ): void {

        beatFrequency = hz
    }

    //% block="reset tap tempo"
    export function resetTapTempo(): void {

        tapTimes = []
    }

    //% block="tap tempo"
    export function tapTempo(): number {

        let now = input.runningTime()

        if (
            tapTimes.length > 0 &&
            now - tapTimes[tapTimes.length - 1] > TAP_TIMEOUT
        ) {
            tapTimes = []
        }

        tapTimes.push(now)

        if (tapTimes.length > 8) {
            tapTimes.shift()
        }

        if (tapTimes.length < 2) {
            return 0
        }

        let sum = 0

        for (
            let i = 1;
            i < tapTimes.length;
            i++
        ) {

            sum +=
                tapTimes[i]
                - tapTimes[i - 1]
        }

        let average =
            sum /
            (tapTimes.length - 1)

        currentBpm =
            Math.round(
                60000 / average
            )

        return currentBpm
    }

    //% block="on beat %beat"
    export function onBeat(
        beat: BeatNumber,
        handler: () => void
    ): void {

        control.onEvent(
            EVENT_ID,
            beat,
            handler
        )
    }
}
