/**
 * Metronome Extension
 * BBC micro:bit
 */

//% color=#3366CC icon="\uf001"
//% block="Metronome"
namespace metronome {

    let running = false
    let sessionId = 0

    // Prvá doba = vyšší tón
    let accentFrequency = 2000

    // Ostatné doby = nižší tón
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

        if (bpm < 1) bpm = 1
        if (beats < 1) beats = 1

        running = true
        sessionId++

        let mySession = sessionId

        control.inBackground(function () {

            while (running && mySession == sessionId) {

                let quarter = 60000 / bpm
                let duration = quarter * (4 / noteValue)

                for (let beat = 1; beat <= beats; beat++) {

                    if (!running) return

                    if (mySession != sessionId)
                        return

                    if (beat == 1) {

                        // zvýraznený prvý tik
                        music.playTone(
                            accentFrequency,
                            80
                        )

                    } else {

                        // ostatné tiky
                        music.playTone(
                            beatFrequency,
                            40
                        )

                    }

                    let waitTime =
                        duration - (beat == 1 ? 80 : 40)

                    if (waitTime < 1)
                        waitTime = 1

                    basic.pause(waitTime)
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
    }

    /**
     * Returns true if running
     */
    //% block="metronome running"
    export function isRunning(): boolean {

        return running
    }

    /**
     * Set accent frequency
     */
    //% block="set accent frequency %hz"
    //% hz.min=100
    //% hz.max=5000
    //% hz.defl=2000
    export function setAccentFrequency(hz: number): void {

        accentFrequency = hz
    }

    /**
     * Set beat frequency
     */
    //% block="set beat frequency %hz"
    //% hz.min=100
    //% hz.max=5000
    //% hz.defl=1000
    export function setBeatFrequency(hz: number): void {

        beatFrequency = hz
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
}
