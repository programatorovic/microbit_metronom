let bpm = 120

input.onButtonPressed(
    Button.A,
    function () {

        bpm =
            metronome.tapTempo()

        if (bpm > 0) {

            basic.showNumber(
                bpm
            )
        }
    }
)

input.onButtonPressed(
    Button.B,
    function () {

        metronome.restart(
            bpm,
            4,
            metronome.NoteValue.Quarter
        )
    }
)

metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)

metronome.onBeat(
    metronome.BeatNumber.One,
    function () {

        basic.showIcon(
            IconNames.Heart
        )
    }
)
