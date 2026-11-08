/**
 * Musical Metronome
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

    // prvá doba
    let accentFrequency = 2000

    // ostatné doby
    let beatFrequency = 1000

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

        if (bpm < 1)
            bpm = 1

        if (beats < 1)
            beats = 1

        currentBpm = bpm

        running = true
        sessionId++

        let mySession = sessionId

        control.inBackground(function () {

            while (
                running &&
                mySession == sessionId
            ) {

                let quarter =
                    60000 / bpm

                let duration =
                    quarter *
                    (4 / noteValue)

                for (
                    let beat = 1;
                    beat <= beats;
                    beat++
                ) {

                    if (
                        !running ||
                        mySession != sessionId
                    ) {
                        return
                    }

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

                        let x =
                            (beat - 1) % 5

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
     * Current BPM
     */
    //% block="current BPM"
    export function getCurrentBpm(): number {

        return currentBpm
    }

    /**
     * Current Beat
     */
    //% block="current beat"
    export function getCurrentBeat(): number {

        return currentBeat
    }

    /**
     * Metronome running
     */
    //% block="metronome running"
    export function isRunning(): boolean {

        return running
    }

    /**
     * Enable LED beat display
     */
    //% block="set LED metronome %enabled"
    export function setLedDisplay(
        enabled: boolean
    ): void {

        ledEnabled = enabled

        if (!enabled) {
            basic.clearScreen()
        }
    }

    /**
     * Set accent frequency
     */
    //% block="set accent frequency %hz"
    //% hz.min=100
    //% hz.max=5000
    //% hz.defl=2000
    export function setAccentFrequency(
        hz: number
    ): void {

        accentFrequency = hz
    }

    /**
     * Set beat frequency
     */
    //% block="set beat frequency %hz"
    //% hz.min=100
    //% hz.max=5000
    //% hz.defl=1000
    export function setBeatFrequency(
        hz: number
    ): void {

        beatFrequency = hz
    }

    /**
     * On first beat
     */
    //% block="on first beat"
    //% blockAllowMultiple=1
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
    //% blockAllowMultiple=1
    export function onOtherBeat(
        handler: () => void
    ): void {

        control.onEvent(
            OTHER_BEAT_EVENT,
            1,
            handler
        )
    }
}
