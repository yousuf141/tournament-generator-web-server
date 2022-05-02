function singles(teams) {
  teams = shuffle(teams); // randomise teams

  let matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    matches.push({
      team_1: teams[i],
      team_2: teams[i + 1],
    });
  }
  return matches;
}

function roundRobin(teams) {
  return singles(teams); // TODO: implement actual round robin algo
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

module.exports = {
  singles,
  roundRobin,
};
