let tempo = 120

metronome.setAccentFrequency(1760)
metronome.setBeatFrequency(880)

metronome.start(
    tempo,
    4,
    metronome.NoteValue.Quarter
)
