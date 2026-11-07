let bpm = 120

input.onButtonPressed(Button.A, function () {

    metronome.registerTap()
})

input.onButtonPressed(Button.B, function () {

    metronome.startTapTempo(8)
})

metronome.onFirstBeat(function () {

    led.plot(0, 0)
})

metronome.onOtherBeat(function () {

    led.unplot(0, 0)
})

basic.forever(function () {

    if (metronome.getTapResult() > 0) {

        bpm =
            metronome.getTapResult()

        metronome.resetTapTempo()

        metronome.restart(
            bpm,
            4,
            metronome.NoteValue.Quarter
        )
    }

    basic.pause(100)
})
