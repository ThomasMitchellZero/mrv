const disposSqueezer = (dispoObj) => {
  const futureDispos = { ...dispoObj };
  let accumulator = 0;

  for (const dispo of Object.keys(futureDispos)) {
    // if this disposition has zero items or a falsy value...
    if (!futureDispos[dispo]) {
      // delete it from unmatched Items
      delete futureDispos[dispo];
      continue;
    }
    accumulator += futureDispos[dispo];
  }

  return {
    dsObj: futureDispos,
    dsQty: accumulator,
  };
};

export default disposSqueezer;
