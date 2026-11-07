input.onButtonPressed(
    Button.A,
    function () {

        let bpm =
            metronome.tapTempo()

        if (bpm > 0) {

            basic.showNumber(
                bpm
            )
        }
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
