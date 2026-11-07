/**
 * Advanced Metronome
 * BBC micro:bit
 */

//% color=#3366CC icon="\uf001"
//% block="Metronome"
namespace metronome {

    const FIRST_BEAT_EVENT = 9001
    const OTHER_BEAT_EVENT = 9002

    let running = false
    let sessionId = 0

    let currentBeat = 0
    let currentBpm = 120

    let ledEnabled = true

    let accentFrequency = 2000
    let beatFrequency = 1000

    //
    // TAP TEMPO
    //

    let tapRunning = false
    let tapTargetCount = 8
    let tapCount = 0
    let tapResult = -1
    let tapTimes: number[] = []

    //
    // METRONOME
    //

    /**
     * Start metronome
     */
    //% block="start metronome BPM %bpm beats %beats note %noteValue"
    //% bpm.min=20
    //% bpm.max=400
    //% bpm.defl=120
    //% beats.min=1
    //% beats.max=16
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

                    if (beat == 1) {

                        control.raiseEvent(
                            FIRST_BEAT_EVENT,
                            1
                        )

                    } else {

                        control.raiseEvent(
                            OTHER_BEAT_EVENT,
                            1
                        )
                    }

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
                            Math.max(
                                1,
                                duration - 80
                            )
                        )

                    } else {

                        music.playTone(
                            beatFrequency,
                            40
                        )

                        basic.pause(
                            Math.max(
                                1,
                                duration - 40
                            )
                        )
                    }
                }
            }
        })
    }

    /**
     * Stop metronome
     */
    //% block="stop metronome"
    export function stop(): void {

        running = false

        sessionId++

        music.stopAllSounds()

        basic.clearScreen()
    }

    /**
     * Restart metronome
     */
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

    /**
     * Metronome running
     */
    //% block="metronome running"
    export function isRunning(): boolean {

        return running
    }

    /**
     * Current beat
     */
    //% block="current beat"
    export function getCurrentBeat(): number {

        return currentBeat
    }

    /**
     * Current BPM
     */
    //% block="current BPM"
    export function getCurrentBpm(): number {

        return currentBpm
    }

    /**
     * Enable LED display
     */
    //% block="set LED metronome %enabled"
    export function setLedDisplay(
        enabled: boolean
    ): void {

        ledEnabled = enabled
    }

    /**
     * Accent frequency
     */
    //% block="set accent frequency %hz"
    export function setAccentFrequency(
        hz: number
    ): void {

        accentFrequency = hz
    }

    /**
     * Beat frequency
     */
    //% block="set beat frequency %hz"
    export function setBeatFrequency(
        hz: number
    ): void {

        beatFrequency = hz
    }

    //
    // EVENTS
    //

    /**
     * On first beat
     */
    //% block="on first beat"
    export function onFirstBeat(
        handler: () => void
    ): void {

        control.onEvent(
            FIRST_BEAT_EVENT,
            1,
            handler
        )
    }

    /**
     * On other beat
     */
    //% block="on other beat"
    export function onOtherBeat(
        handler: () => void
    ): void {

        control.onEvent(
            OTHER_BEAT_EVENT,
            1,
            handler
        )
    }

    //
    // TAP TEMPO
    //

    /**
     * Start Tap Tempo
     */
    //% block="start tap tempo count %count"
    //% count.min=4
    //% count.max=9
    //% count.defl=8
    export function startTapTempo(
        count: number
    ): void {

        tapRunning = true

        tapTargetCount = count
        tapCount = 0
        tapResult = -1

        tapTimes = []

        basic.showNumber(count)

        control.inBackground(function () {

            basic.pause(4000)

            if (
                tapRunning &&
                tapCount == 0
            ) {

                tapRunning = false

                basic.showIcon(
                    IconNames.No
                )
            }
        })
    }

    /**
     * Register Tap
     */
    //% block="register tap"
    export function registerTap(): void {

        if (!tapRunning)
            return

        let now = input.runningTime()

        if (
            tapTimes.length > 0 &&
            now - tapTimes[tapTimes.length - 1] > 4000
        ) {

            tapRunning = false

            tapResult = -1

            basic.showIcon(
                IconNames.No
            )

            return
        }

        tapTimes.push(now)

        tapCount++

        let remaining =
            tapTargetCount - tapCount

        if (remaining > 0) {

            basic.showNumber(
                remaining
            )

            return
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

        let avg =
            sum /
            (tapTimes.length - 1)

        tapResult =
            Math.round(
                60000 / avg
            )

        currentBpm =
            tapResult

        tapRunning = false

        basic.showIcon(
            IconNames.Yes
        )
    }

    /**
     * Reset Tap Tempo
     */
    //% block="reset tap tempo"
    export function resetTapTempo(): void {

        tapRunning = false

        tapCount = 0

        tapResult = -1

        tapTimes = []
    }

    /**
     * Tap running
     */
    //% block="tap tempo running"
    export function tapTempoRunning(): boolean {

        return tapRunning
    }

    /**
     * Tap result
     */
    //% block="tap result"
    export function getTapResult(): number {

        return tapResult
    }
}
