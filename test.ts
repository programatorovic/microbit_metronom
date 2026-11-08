metronome.start(
    120,
    4,
    metronome.NoteValue.Quarter
)

metronome.onFirstBeat(function () {

    led.plot(0, 0)

})

metronome.onOtherBeat(function () {

    led.unplot(0, 0)

})
