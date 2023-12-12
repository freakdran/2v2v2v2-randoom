window.onload = function reload() {
  sessionStorage.removeItem('rollAllUsed');
  document.getElementById('hash').innerHTML = Math.floor(
    Math.random() * Date.now()
  ).toString(36);

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (params.x && checkParams(params.x)) {
    const players = params.x.split('--').map((x) => {
      const a = x.split('-');
      return { name: a[0], champ: parseInt(a[1]) };
    });
    if (players.length < 8) {
      return;
    }

    document.getElementById('footer').classList.add('hidden');
    document.getElementById('buttonsWrapper').classList.add('hidden');
    document.getElementById('inputWrapper').classList.add('hidden');

    fillResult(players, 0);
  }
};

function rollChamps() {
  const rollAllUsed = sessionStorage.getItem('rollAllUsed');
  if (rollAllUsed) {
    const players = JSON.parse(sessionStorage.getItem('players'));
    const newPlayers = players.map((player) => {
      const newChamp = { ...player };
      newChamp.champ = Math.floor(
        Math.random() * Object.keys(allChamps).length + 1
      );
      return newChamp;
    });

    fillResult(newPlayers);
  } else {
    alert('Please roll all first');
  }
}

function rollAll() {
  const playerInput = document.getElementsByClassName('player');
  let players = [];
  for (let i = 0; i < playerInput.length; i++) {
    const playername = playerInput.item(i).value;
    if (!playername) {
      alert('Not all players inserted');
      players = [];
      return;
    }
    players.push({
      name: playerInput.item(i).value,
      champ: Math.floor(Math.random() * Object.keys(allChamps).length + 1),
    });
  }
  const shuffledPlayers = players.sort((a, b) => 0.5 - Math.random());
  sessionStorage.setItem('players', JSON.stringify(shuffledPlayers));

  fillResult(shuffledPlayers);

  sessionStorage.setItem('rollAllUsed', true);
}

function fillResult(players, timeout = 2100) {
  document.getElementById('mainBody').classList.add('animation');

  const url = `${window.location.href}?x=${generateQuery(players)}`;

  const b1 = document
    .getElementsByClassName('buttons')
    .item(0)
    .children.item(0);
  const b2 = document
    .getElementsByClassName('buttons')
    .item(0)
    .children.item(1);
  b1.disabled = true;
  b2.disabled = true;

  const htmlTemplate = `<div class="champName" >
      $champName
    </div>
    <div class="champTitle" >
      $champTitle
    </div>
    <img src="./assets/$champImage.jpg" width="100" height="100">
    <p>$name</p>`;
  const teams = document.getElementsByClassName('team');

  setTimeout(() => {
    document.getElementById('mainBody').classList.remove('animation');
    document.getElementById('resultBody').classList.remove('hidden');
    b1.disabled = false;
    b2.disabled = false;
    for (let i = 0; i < teams.length; i++) {
      const player1 = players.shift();
      const player2 = players.shift();
      if (player1.champ === player2.champ) {
        player2.champ =
          player2.champ + 1 < allChamps.length
            ? player2.champ + 1
            : player2.champ - 1;
      }
      teams.item(i).getElementsByClassName('player1').item(0).innerHTML =
        htmlTemplate
          .replace('$champName', allChamps[player1.champ].name)
          .replace('$champTitle', allChamps[player1.champ].title)
          .replace('$champImage', player1.champ)
          .replace('$name', player1.name);
      teams.item(i).getElementsByClassName('player2').item(0).innerHTML =
        htmlTemplate
          .replace('$champName', allChamps[player2.champ].name)
          .replace('$champTitle', allChamps[player2.champ].title)
          .replace('$champImage', player2.champ)
          .replace('$name', player2.name);
    }
    const [text, counter] = document
      .getElementById('counter')
      .innerHTML.split(': ');
    document.getElementById('counter').innerHTML = `${text}: ${
      parseInt(counter) + 1
    }`;
    document.getElementById(
      'url'
    ).innerHTML = `${url}<span class="tooltip">Copy to clipboard</span>`;
  }, timeout);
}

function copyUrl() {
  const url = document.getElementById('url').childNodes[0].nodeValue;
  navigator.clipboard.writeText(url);
}

function checkParams(params) {
  const players = params.split('--');

  if (players.length < 8) {
    return false;
  }

  let correct = true;
  players.forEach((player) => {
    if (player.split('-').length !== 2) {
      console.log('wrong player');
      correct = false;
    }
  });
  return correct;
}

function generateQuery(players) {
  let { name, champ } = players[0];
  let query = `${name}-${champ}`;
  let i = 1;
  do {
    const { name, champ } = players[i];
    query += `--${name}-${champ}`;
    i++;
  } while (i < players.length);
  return query;
}

// ARAM BLOCK
function aramRollAll() {
  const playerInput = document.getElementsByClassName('player');
  let players = [];
  for (let i = 0; i < playerInput.length; i++) {
    const playername = playerInput.item(i).value;
    if (playername) {
      players.push(playername);
    }
  }
  const shuffledPlayers = players.sort((a, b) => 0.5 - Math.random());
  sessionStorage.setItem('players', JSON.stringify(shuffledPlayers));

  aramFillResult(shuffledPlayers);

  sessionStorage.setItem('rollAllUsed', true);
}

function aramRollChamps() {
  const rollAllUsed = sessionStorage.getItem('rollAllUsed');
  if (rollAllUsed) {
    const players = JSON.parse(sessionStorage.getItem('players'));
    const newPlayers = players.map((player) => {
      const newChamp = { ...player };
      newChamp.champ1 = Math.floor(
        Math.random() * Object.keys(allChamps).length + 1
      );
      newChamp.champ2 = Math.floor(
        Math.random() * Object.keys(allChamps).length + 1
      );
      return newChamp;
    });

    aramFillResult(newPlayers);
  } else {
    alert('Please roll all first');
  }
}

function aramFillResult(players, timeout = 2100) {
  document.getElementById('mainBody').classList.add('animation');

  // const url = `${window.location.href}?x=${generateQuery(players)}`;

  const b1 = document
    .getElementsByClassName('buttons')
    .item(0)
    .children.item(0);
  const b2 = document
    .getElementsByClassName('buttons')
    .item(0)
    .children.item(1);
  b1.disabled = true;
  b2.disabled = true;

  const htmlTemplateChamps = `<div class="champName">
      $champName
    </div>
    <div class="champTitle" >
      $champTitle
    </div>
    <img src="../assets/$champImage.jpg" width="100" height="100">`;

  const teams = document.getElementsByClassName('team');

  setTimeout(() => {
    document.getElementById('mainBody').classList.remove('animation');
    document.getElementById('resultBody').classList.remove('hidden');
    b1.disabled = false;
    b2.disabled = false;

    const team1 = players.slice(0, Math.ceil(players.length / 2));
    const team2 = players.slice(Math.ceil(players.length / 2));

    const team1Champs = Array.from({ length: players.length }, () =>
      Math.floor(Math.random() * Object.keys(allChamps).length + 1)
    );
    const team2Champs = Array.from({ length: players.length }, () =>
      Math.floor(Math.random() * Object.keys(allChamps).length + 1)
    );

    let htmlPlayers1 = '';
    let htmlPlayers2 = '';
    team1.forEach((player) => (htmlPlayers1 += `<p>${player}<p>`));
    team2.forEach((player) => (htmlPlayers2 += `<p>${player}<p>`));

    teams.item(0).getElementsByClassName('players').item(0).innerHTML =
      htmlPlayers1;
    teams.item(1).getElementsByClassName('players').item(0).innerHTML =
      htmlPlayers2;

    let htmlChamps1 = '';
    let htmlChamps2 = '';
    team1Champs.forEach((champ) => {
      console.log(champ);
      console.log(allChamps[champ]);
      htmlChamps1 += htmlTemplateChamps
        .replace('$champName', allChamps[champ].name)
        .replace('$champTitle', allChamps[champ].title)
        .replace('$champImage', champ);
    });
    team2Champs.forEach((champ) => {
      console.log(champ);
      console.log(allChamps[champ]);
      htmlChamps2 += htmlTemplateChamps
        .replace('$champName', allChamps[champ].name)
        .replace('$champTitle', allChamps[champ].title)
        .replace('$champImage', champ);
    });
    teams.item(0).getElementsByClassName('champs').item(0).innerHTML =
      htmlChamps1;
    teams.item(1).getElementsByClassName('champs').item(0).innerHTML =
      htmlChamps2;

    const [text, counter] = document
      .getElementById('counter')
      .innerHTML.split(': ');
    document.getElementById('counter').innerHTML = `${text}: ${
      parseInt(counter) + 1
    }`;
    // document.getElementById(
    //   'url'
    // ).innerHTML = `${url}<span class="tooltip">Copy to clipboard</span>`;
  }, timeout);
}

const allChamps = {
  1: { name: 'Aatrox', title: 'the Darkin Blade' },
  2: { name: 'Ahri', title: 'the Nine-Tailed Fox' },
  3: { name: 'Akali', title: 'the Rogue Assassin' },
  4: { name: 'Akshan', title: 'the Rogue Sentinel' },
  5: { name: 'Alistar', title: 'the Minotaur' },
  6: { name: 'Amumu', title: 'the Sad Mummy' },
  7: { name: 'Anivia', title: 'the Cryophoenix' },
  8: { name: 'Annie', title: 'the Dark Child' },
  9: { name: 'Aphelios', title: 'the Weapon of the Faithful' },
  10: { name: 'Ashe', title: 'the Frost Archer' },
  11: { name: 'Aurelion Sol', title: 'the Star Forger' },
  12: { name: 'Azir', title: 'the Emperor of the Sands' },
  13: { name: 'Bard', title: 'the Wandering Caretaker' },
  14: { name: "Bel'Veth", title: 'the Empress of the Void' },
  15: { name: 'Blitzcrank', title: 'the Great Steam Golem' },
  16: { name: 'Brand', title: 'the Burning Vengeance' },
  17: { name: 'Braum', title: 'the Heart of the Freljord' },
  18: { name: 'Caitlyn', title: 'the Sheriff of Piltover' },
  19: { name: 'Camille', title: 'the Steel Shadow' },
  20: { name: 'Cassiopeia', title: "the Serpent's Embrace" },
  21: { name: "Cho'Gath", title: 'the Terror of the Void' },
  22: { name: 'Corki', title: 'the Daring Bombardier' },
  23: { name: 'Darius', title: 'the Hand of Noxus' },
  24: { name: 'Diana', title: 'Scorn of the Moon' },
  25: { name: 'Dr. Mundo', title: 'the Madman of Zaun' },
  26: { name: 'Draven', title: 'the Glorious Executioner' },
  27: { name: 'Ekko', title: 'the Boy Who Shattered Time' },
  28: { name: 'Elise', title: 'the Spider Queen' },
  29: { name: 'Evelynn', title: "Agony's Embrace" },
  30: { name: 'Ezreal', title: 'the Prodigal Explorer' },
  31: { name: 'Fiddlesticks', title: 'the Ancient Fear' },
  32: { name: 'Fiora', title: 'the Grand Duelist' },
  33: { name: 'Fizz', title: 'the Tidal Trickster' },
  34: { name: 'Galio', title: 'the Colossus' },
  35: { name: 'Gangplank', title: 'the Saltwater Scourge' },
  36: { name: 'Garen', title: 'the Might of Demacia' },
  37: { name: 'Gnar', title: 'the Missing Link' },
  38: { name: 'Gragas', title: 'the Rabble Rouser' },
  39: { name: 'Graves', title: 'the Outlaw' },
  40: { name: 'Gwen', title: 'the Hallowed Seamstress' },
  41: { name: 'Hecarim', title: 'the Shadow of War' },
  42: { name: 'Heimerdinger', title: 'the Revered Inventor' },
  43: { name: 'Illaoi', title: 'the Kraken Priestess' },
  44: { name: 'Irelia', title: 'the Blade Dancer' },
  45: { name: 'Ivern', title: 'the Green Father' },
  46: { name: 'Janna', title: "the Storm's Fury" },
  47: { name: 'Jarvan IV', title: 'the Exemplar of Demacia' },
  48: { name: 'Jax', title: 'Grandmaster at Arms' },
  49: { name: 'Jayce', title: 'the Defender of Tomorrow' },
  50: { name: 'Jhin', title: 'the Virtuoso' },
  51: { name: 'Jinx', title: 'the Loose Cannon' },
  52: { name: "K'Sante", title: 'the Pride of Nazumah' },
  53: { name: "Kai'Sa", title: 'Daughter of the Void' },
  54: { name: 'Kalista', title: 'the Spear of Vengeance' },
  55: { name: 'Karma', title: 'the Enlightened One' },
  56: { name: 'Karthus', title: 'the Deathsinger' },
  57: { name: 'Kassadin', title: 'the Void Walker' },
  58: { name: 'Katarina', title: 'the Sinister Blade' },
  59: { name: 'Kayle', title: 'the Righteous' },
  60: { name: 'Kayn', title: 'the Shadow Reaper' },
  61: { name: 'Kennen', title: 'the Heart of the Tempest' },
  62: { name: "Kha'Zix", title: 'the Voidreaver' },
  63: { name: 'Kindred', title: 'the Eternal Hunters' },
  64: { name: 'Kled', title: 'the Cantankerous Cavalier' },
  65: { name: "Kog'Maw", title: 'the Mouth of the Abyss' },
  66: { name: 'LeBlanc', title: 'the Deceiver' },
  67: { name: 'Lee Sin', title: 'the Blind Monk' },
  68: { name: 'Leona', title: 'the Radiant Dawn' },
  69: { name: 'Lillia', title: 'the Bashful Bloom' },
  70: { name: 'Lissandra', title: 'the Ice Witch' },
  71: { name: 'Lucian', title: 'the Purifier' },
  72: { name: 'Lulu', title: 'the Fae Sorceress' },
  73: { name: 'Lux', title: 'the Lady of Luminosity' },
  74: { name: 'Malphite', title: 'Shard of the Monolith' },
  75: { name: 'Malzahar', title: 'the Prophet of the Void' },
  76: { name: 'Maokai', title: 'the Twisted Treant' },
  77: { name: 'Master Yi', title: 'the Wuju Bladesman' },
  78: { name: 'Milio', title: 'the Gentle Flame' },
  79: { name: 'Miss Fortune', title: 'the Bounty Hunter' },
  80: { name: 'Mordekaiser', title: 'the Iron Revenant' },
  81: { name: 'Morgana', title: 'the Fallen' },
  82: { name: 'Nami', title: 'the Tidecaller' },
  83: { name: 'Nasus', title: 'the Curator of the Sands' },
  84: { name: 'Nautilus', title: 'the Titan of the Depths' },
  85: { name: 'Neeko', title: 'the Curious Chameleon' },
  86: { name: 'Nidalee', title: 'the Bestial Huntress' },
  87: { name: 'Nilah', title: 'the Joy Unbound' },
  88: { name: 'Nocturne', title: 'the Eternal Nightmare' },
  89: { name: 'Nunu & Willump', title: 'the Boy and His Yeti' },
  90: { name: 'Olaf', title: 'the Berserker' },
  91: { name: 'Orianna', title: 'the Lady of Clockwork' },
  92: { name: 'Ornn', title: 'the Fire Below the Mountain' },
  93: { name: 'Pantheon', title: 'the Unbreakable Spear' },
  94: { name: 'Poppy', title: 'Keeper of the Hammer' },
  95: { name: 'Pyke', title: 'the Bloodharbor Ripper' },
  96: { name: 'Qiyana', title: 'Empress of the Elements' },
  97: { name: 'Quinn', title: "Demacia's Wings" },
  98: { name: 'Rakan', title: 'the Charmer' },
  99: { name: 'Rammus', title: 'the Armordillo' },
  100: { name: "Rek'Sai", title: 'the Void Burrower' },
  101: { name: 'Rell', title: 'the Iron Maiden' },
  102: { name: 'Renata Glasc', title: 'the Chem-Baroness' },
  103: { name: 'Renekton', title: 'the Butcher of the Sands' },
  104: { name: 'Rengar', title: 'the Pridestalker' },
  105: { name: 'Riven', title: 'the Exile' },
  106: { name: 'Rumble', title: 'the Mechanized Menace' },
  107: { name: 'Ryze', title: 'the Rune Mage' },
  108: { name: 'Samira', title: 'the Desert Rose' },
  109: { name: 'Sejuani', title: 'Fury of the North' },
  110: { name: 'Senna', title: 'the Redeemer' },
  111: { name: 'Seraphine', title: 'the Starry-Eyed Songstress' },
  112: { name: 'Sett', title: 'the Boss' },
  113: { name: 'Shaco', title: 'the Demon Jester' },
  114: { name: 'Shen', title: 'the Eye of Twilight' },
  115: { name: 'Shyvana', title: 'the Half-Dragon' },
  116: { name: 'Singed', title: 'the Mad Chemist' },
  117: { name: 'Sion', title: 'the Undead Juggernaut' },
  118: { name: 'Sivir', title: 'the Battle Mistress' },
  119: { name: 'Skarner', title: 'the Crystal Vanguard' },
  120: { name: 'Sona', title: 'Maven of the Strings' },
  121: { name: 'Soraka', title: 'the Starchild' },
  122: { name: 'Swain', title: 'the Noxian Grand General' },
  123: { name: 'Sylas', title: 'the Unshackled' },
  124: { name: 'Syndra', title: 'the Dark Sovereign' },
  125: { name: 'Tahm Kench', title: 'the River King' },
  126: { name: 'Taliyah', title: 'the Stoneweaver' },
  127: { name: 'Talon', title: "the Blade's Shadow" },
  128: { name: 'Taric', title: 'the Shield of Valoran' },
  129: { name: 'Teemo', title: 'the Swift Scout' },
  130: { name: 'Thresh', title: 'the Chain Warden' },
  131: { name: 'Tristana', title: 'the Yordle Gunner' },
  132: { name: 'Trundle', title: 'the Troll King' },
  133: { name: 'Tryndamere', title: 'the Barbarian King' },
  134: { name: 'Twisted Fate', title: 'the Card Master' },
  135: { name: 'Twitch', title: 'the Plague Rat' },
  136: { name: 'Udyr', title: 'the Spirit Walker' },
  137: { name: 'Urgot', title: 'the Dreadnought' },
  138: { name: 'Varus', title: 'the Arrow of Retribution' },
  139: { name: 'Vayne', title: 'the Night Hunter' },
  140: { name: 'Veigar', title: 'the Tiny Master of Evil' },
  141: { name: "Vel'Koz", title: 'the Eye of the Void' },
  142: { name: 'Vex', title: 'the Gloomist' },
  143: { name: 'Vi', title: 'the Piltover Enforcer' },
  144: { name: 'Viego', title: 'the Ruined King' },
  145: { name: 'Viktor', title: 'the Machine Herald' },
  146: { name: 'Vladimir', title: 'the Crimson Reaper' },
  147: { name: 'Volibear', title: 'the Relentless Storm' },
  148: { name: 'Warwick', title: 'the Uncaged Wrath of Zaun' },
  149: { name: 'Wukong', title: 'the Monkey King' },
  150: { name: 'Xayah', title: 'the Rebel' },
  151: { name: 'Xerath', title: 'the Magus Ascendant' },
  152: { name: 'Xin Zhao', title: 'the Seneschal of Demacia' },
  153: { name: 'Yasuo', title: 'the Unforgiven' },
  154: { name: 'Yone', title: 'the Unforgotten' },
  155: { name: 'Yorick', title: 'Shepherd of Souls' },
  156: { name: 'Yuumi', title: 'the Magical Cat' },
  157: { name: 'Zac', title: 'the Secret Weapon' },
  158: { name: 'Zed', title: 'the Master of Shadows' },
  159: { name: 'Zeri', title: 'the Spark of Zaun' },
  160: { name: 'Ziggs', title: 'the Hexplosives Expert' },
  161: { name: 'Zilean', title: 'the Chronokeeper' },
  162: { name: 'Zoe', title: 'the Aspect of Twilight' },
  163: { name: 'Zyra', title: 'Rise of the Thorns' },
  164: { name: 'Naafiri', title: 'The Hound of a Hundred Bites' },
  165: { name: 'Briar', title: 'the Restrained Hunger' },
  166: { name: 'Hwei', title: 'the Visionary' },
};
