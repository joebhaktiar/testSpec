const phrase = (key = '1') => {
  const values = {
    '1': 'First',
    '2': 'Second',
    '3': 'Third',
    '4': 'Fourth',
    '5': 'Fifth',
    '6': 'Sixth',
    '7': 'Seventh',
    '8': 'Eighth',
    '9': 'Ninth',
    '10': 'Tenth',
  }

  return values[key]
}

export default phrase
