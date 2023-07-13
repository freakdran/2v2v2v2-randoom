window.onload = function reload() {
  sessionStorage.removeItem('rollAllUsed');
};

function rollChamps() {
  const rollAllUsed = sessionStorage.getItem('rollAllUsed');
  if (rollAllUsed) {
    console.log('rolling champs');
  } else {
    console.log('Please roll all first');
  }
}

function rollAll() {
  const playerInput = document.getElementsByClassName('player');
  let players = [];
  for (let i = 0; i < playerInput.length; i++) {
    const playername = playerInput.item(i).value;
    if (!playername) {
      console.log('Not all players inserted');
      // players = [];
      // return;
    }
    players.push({
      name: playerInput.item(i).value,
      champ: Math.floor(Math.random() * Object.keys(allChamps).length + 1),
    });
  }
  const shuffledPlayers = players.sort((a, b) => 0.5 - Math.random());
  fillResult(shuffledPlayers);

  sessionStorage.setItem('rollAllUsed', true);
  sessionStorage.setItem('players', shuffledPlayers);
  console.log('rolled all');
}

function fillResult(players) {
  const htmlTemplate = `<div style="font-weight: bold">
      $champName
    </div>
    <div style="font-weight: bold; font-size:13px">
      $champTitle
    </div>
    <img src="./assets/$champImage.jpg" width="100" height="100">
    <p>$name</p>`;
  const teams = document.getElementsByClassName('team');

  for (let i = 0; i < teams.length; i++) {
    const player1 = players.pop();
    const player2 = players.pop();
    if (player1.champ === player2.champ) {
      player2.champ = player2.champ + 1 < allChamps.length ? player2.champ + 1 : player2.champ - 1;
    }
    console.log(player1.champ);
    teams.item(i).getElementsByClassName('player1').item(0).innerHTML = htmlTemplate
      .replace('$champName', allChamps[player1.champ].name)
      .replace('$champTitle', allChamps[player1.champ].title)
      .replace('$champImage', player1.champ)
      .replace('$name', player1.name);
    teams.item(i).getElementsByClassName('player2').item(0).innerHTML = htmlTemplate
      .replace('$champName', allChamps[player2.champ].name)
      .replace('$champTitle', allChamps[player2.champ].title)
      .replace('$champImage', player2.champ)
      .replace('$name', player2.name);
  }
}

const allChamps = {
  1: { name: 'Aatrox', title: 'the Darkin Blade', image: '' },
  2: { name: 'Ahri', title: 'the Nine-Tailed Fox', image: '' },
  3: { name: 'Akali', title: 'the Rogue Assassin', image: '' },
  4: { name: 'Akshan', title: 'the Rogue Sentinel', image: '' },
  5: { name: 'Alistar', title: 'the Minotaur', image: '' },
  6: { name: 'Amumu', title: 'the Sad Mummy', image: '' },
  7: { name: 'Anivia', title: 'the Cryophoenix', image: '' },
  8: { name: 'Annie', title: 'the Dark Child', image: '' },
  9: { name: 'Aphelios', title: 'the Weapon of the Faithful', image: '' },
  10: { name: 'Ashe', title: 'the Frost Archer', image: '' },
  11: { name: 'Aurelion Sol', title: 'the Star Forger', image: '' },
  12: { name: 'Azir', title: 'the Emperor of the Sands', image: '' },
  13: { name: 'Bard', title: 'the Wandering Caretaker', image: '' },
  14: { name: "Bel'Veth", title: 'the Empress of the Void', image: '' },
  15: { name: 'Blitzcrank', title: 'the Great Steam Golem', image: '' },
  16: { name: 'Brand', title: 'the Burning Vengeance', image: '' },
  17: { name: 'Braum', title: 'the Heart of the Freljord', image: '' },
  18: { name: 'Caitlyn', title: 'the Sheriff of Piltover', image: '' },
  19: { name: 'Camille', title: 'the Steel Shadow', image: '' },
  20: { name: 'Cassiopeia', title: "the Serpent's Embrace", image: '' },
  21: { name: "Cho'Gath", title: 'the Terror of the Void', image: '' },
  22: { name: 'Corki', title: 'the Daring Bombardier', image: '' },
  23: { name: 'Darius', title: 'the Hand of Noxus', image: '' },
  24: { name: 'Diana', title: 'Scorn of the Moon', image: '' },
  25: { name: 'Dr. Mundo', title: 'the Madman of Zaun', image: '' },
  26: { name: 'Draven', title: 'the Glorious Executioner', image: '' },
  27: { name: 'Ekko', title: 'the Boy Who Shattered Time', image: '' },
  28: { name: 'Elise', title: 'the Spider Queen', image: '' },
  29: { name: 'Evelynn', title: "Agony's Embrace", image: '' },
  30: { name: 'Ezreal', title: 'the Prodigal Explorer', image: '' },
  31: { name: 'Fiddlesticks', title: 'the Ancient Fear', image: '' },
  32: { name: 'Fiora', title: 'the Grand Duelist', image: '' },
  33: { name: 'Fizz', title: 'the Tidal Trickster', image: '' },
  34: { name: 'Galio', title: 'the Colossus', image: '' },
  35: { name: 'Gangplank', title: 'the Saltwater Scourge', image: '' },
  36: { name: 'Garen', title: 'the Might of Demacia', image: '' },
  37: { name: 'Gnar', title: 'the Missing Link', image: '' },
  38: { name: 'Gragas', title: 'the Rabble Rouser', image: '' },
  39: { name: 'Graves', title: 'the Outlaw', image: '' },
  40: { name: 'Gwen', title: 'the Hallowed Seamstress', image: '' },
  41: { name: 'Hecarim', title: 'the Shadow of War', image: '' },
  42: { name: 'Heimerdinger', title: 'the Revered Inventor', image: '' },
  43: { name: 'Illaoi', title: 'the Kraken Priestess', image: '' },
  44: { name: 'Irelia', title: 'the Blade Dancer', image: '' },
  45: { name: 'Ivern', title: 'the Green Father', image: '' },
  46: { name: 'Janna', title: "the Storm's Fury", image: '' },
  47: { name: 'Jarvan IV', title: 'the Exemplar of Demacia', image: '' },
  48: { name: 'Jax', title: 'Grandmaster at Arms', image: '' },
  49: { name: 'Jayce', title: 'the Defender of Tomorrow', image: '' },
  50: { name: 'Jhin', title: 'the Virtuoso', image: '' },
  51: { name: 'Jinx', title: 'the Loose Cannon', image: '' },
  52: { name: "K'Sante", title: 'the Pride of Nazumah', image: '' },
  53: { name: "Kai'Sa", title: 'Daughter of the Void', image: '' },
  54: { name: 'Kalista', title: 'the Spear of Vengeance', image: '' },
  55: { name: 'Karma', title: 'the Enlightened One', image: '' },
  56: { name: 'Karthus', title: 'the Deathsinger', image: '' },
  57: { name: 'Kassadin', title: 'the Void Walker', image: '' },
  58: { name: 'Katarina', title: 'the Sinister Blade', image: '' },
  59: { name: 'Kayle', title: 'the Righteous', image: '' },
  60: { name: 'Kayn', title: 'the Shadow Reaper', image: '' },
  61: { name: 'Kennen', title: 'the Heart of the Tempest', image: '' },
  62: { name: "Kha'Zix", title: 'the Voidreaver', image: '' },
  63: { name: 'Kindred', title: 'the Eternal Hunters', image: '' },
  64: { name: 'Kled', title: 'the Cantankerous Cavalier', image: '' },
  65: { name: "Kog'Maw", title: 'the Mouth of the Abyss', image: '' },
  66: { name: 'LeBlanc', title: 'the Deceiver', image: '' },
  67: { name: 'Lee Sin', title: 'the Blind Monk', image: '' },
  68: { name: 'Leona', title: 'the Radiant Dawn', image: '' },
  69: { name: 'Lillia', title: 'the Bashful Bloom', image: '' },
  70: { name: 'Lissandra', title: 'the Ice Witch', image: '' },
  71: { name: 'Lucian', title: 'the Purifier', image: '' },
  72: { name: 'Lulu', title: 'the Fae Sorceress', image: '' },
  73: { name: 'Lux', title: 'the Lady of Luminosity', image: '' },
  74: { name: 'Malphite', title: 'Shard of the Monolith', image: '' },
  75: { name: 'Malzahar', title: 'the Prophet of the Void', image: '' },
  76: { name: 'Maokai', title: 'the Twisted Treant', image: '' },
  77: { name: 'Master Yi', title: 'the Wuju Bladesman', image: '' },
  78: { name: 'Milio', title: 'the Gentle Flame', image: '' },
  79: { name: 'Miss Fortune', title: 'the Bounty Hunter', image: '' },
  80: { name: 'Mordekaiser', title: 'the Iron Revenant', image: '' },
  81: { name: 'Morgana', title: 'the Fallen', image: '' },
  82: { name: 'Nami', title: 'the Tidecaller', image: '' },
  83: { name: 'Nasus', title: 'the Curator of the Sands', image: '' },
  84: { name: 'Nautilus', title: 'the Titan of the Depths', image: '' },
  85: { name: 'Neeko', title: 'the Curious Chameleon', image: '' },
  86: { name: 'Nidalee', title: 'the Bestial Huntress', image: '' },
  87: { name: 'Nilah', title: 'the Joy Unbound', image: '' },
  88: { name: 'Nocturne', title: 'the Eternal Nightmare', image: '' },
  89: { name: 'Nunu & Willump', title: 'the Boy and His Yeti', image: '' },
  90: { name: 'Olaf', title: 'the Berserker', image: '' },
  91: { name: 'Orianna', title: 'the Lady of Clockwork', image: '' },
  92: { name: 'Ornn', title: 'the Fire Below the Mountain', image: '' },
  93: { name: 'Pantheon', title: 'the Unbreakable Spear', image: '' },
  94: { name: 'Poppy', title: 'Keeper of the Hammer', image: '' },
  95: { name: 'Pyke', title: 'the Bloodharbor Ripper', image: '' },
  96: { name: 'Qiyana', title: 'Empress of the Elements', image: '' },
  97: { name: 'Quinn', title: "Demacia's Wings", image: '' },
  98: { name: 'Rakan', title: 'the Charmer', image: '' },
  99: { name: 'Rammus', title: 'the Armordillo', image: '' },
  100: { name: "Rek'Sai", title: 'the Void Burrower', image: '' },
  101: { name: 'Rell', title: 'the Iron Maiden', image: '' },
  102: { name: 'Renata Glasc', title: 'the Chem-Baroness', image: '' },
  103: { name: 'Renekton', title: 'the Butcher of the Sands', image: '' },
  104: { name: 'Rengar', title: 'the Pridestalker', image: '' },
  105: { name: 'Riven', title: 'the Exile', image: '' },
  106: { name: 'Rumble', title: 'the Mechanized Menace', image: '' },
  107: { name: 'Ryze', title: 'the Rune Mage', image: '' },
  108: { name: 'Samira', title: 'the Desert Rose', image: '' },
  109: { name: 'Sejuani', title: 'Fury of the North', image: '' },
  110: { name: 'Senna', title: 'the Redeemer', image: '' },
  111: { name: 'Seraphine', title: 'the Starry-Eyed Songstress', image: '' },
  112: { name: 'Sett', title: 'the Boss', image: '' },
  113: { name: 'Shaco', title: 'the Demon Jester', image: '' },
  114: { name: 'Shen', title: 'the Eye of Twilight', image: '' },
  115: { name: 'Shyvana', title: 'the Half-Dragon', image: '' },
  116: { name: 'Singed', title: 'the Mad Chemist', image: '' },
  117: { name: 'Sion', title: 'the Undead Juggernaut', image: '' },
  118: { name: 'Sivir', title: 'the Battle Mistress', image: '' },
  119: { name: 'Skarner', title: 'the Crystal Vanguard', image: '' },
  120: { name: 'Sona', title: 'Maven of the Strings', image: '' },
  121: { name: 'Soraka', title: 'the Starchild', image: '' },
  122: { name: 'Swain', title: 'the Noxian Grand General', image: '' },
  123: { name: 'Sylas', title: 'the Unshackled', image: '' },
  124: { name: 'Syndra', title: 'the Dark Sovereign', image: '' },
  125: { name: 'Tahm Kench', title: 'the River King', image: '' },
  126: { name: 'Taliyah', title: 'the Stoneweaver', image: '' },
  127: { name: 'Talon', title: "the Blade's Shadow", image: '' },
  128: { name: 'Taric', title: 'the Shield of Valoran', image: '' },
  129: { name: 'Teemo', title: 'the Swift Scout', image: '' },
  130: { name: 'Thresh', title: 'the Chain Warden', image: '' },
  131: { name: 'Tristana', title: 'the Yordle Gunner', image: '' },
  132: { name: 'Trundle', title: 'the Troll King', image: '' },
  133: { name: 'Tryndamere', title: 'the Barbarian King', image: '' },
  134: { name: 'Twisted Fate', title: 'the Card Master', image: '' },
  135: { name: 'Twitch', title: 'the Plague Rat', image: '' },
  136: { name: 'Udyr', title: 'the Spirit Walker', image: '' },
  137: { name: 'Urgot', title: 'the Dreadnought', image: '' },
  138: { name: 'Varus', title: 'the Arrow of Retribution', image: '' },
  139: { name: 'Vayne', title: 'the Night Hunter', image: '' },
  140: { name: 'Veigar', title: 'the Tiny Master of Evil', image: '' },
  141: { name: "Vel'Koz", title: 'the Eye of the Void', image: '' },
  142: { name: 'Vex', title: 'the Gloomist', image: '' },
  143: { name: 'Vi', title: 'the Piltover Enforcer', image: '' },
  144: { name: 'Viego', title: 'the Ruined King', image: '' },
  145: { name: 'Viktor', title: 'the Machine Herald', image: '' },
  146: { name: 'Vladimir', title: 'the Crimson Reaper', image: '' },
  147: { name: 'Volibear', title: 'the Relentless Storm', image: '' },
  148: { name: 'Warwick', title: 'the Uncaged Wrath of Zaun', image: '' },
  149: { name: 'Wukong', title: 'the Monkey King', image: '' },
  150: { name: 'Xayah', title: 'the Rebel', image: '' },
  151: { name: 'Xerath', title: 'the Magus Ascendant', image: '' },
  152: { name: 'Xin Zhao', title: 'the Seneschal of Demacia', image: '' },
  153: { name: 'Yasuo', title: 'the Unforgiven', image: '' },
  154: { name: 'Yone', title: 'the Unforgotten', image: '' },
  155: { name: 'Yorick', title: 'Shepherd of Souls', image: '' },
  156: { name: 'Yuumi', title: 'the Magical Cat', image: '' },
  157: { name: 'Zac', title: 'the Secret Weapon', image: '' },
  158: { name: 'Zed', title: 'the Master of Shadows', image: '' },
  159: { name: 'Zeri', title: 'the Spark of Zaun', image: '' },
  160: { name: 'Ziggs', title: 'the Hexplosives Expert', image: '' },
  161: { name: 'Zilean', title: 'the Chronokeeper', image: '' },
  162: { name: 'Zoe', title: 'the Aspect of Twilight', image: '' },
  163: { name: 'Zyra', title: 'Rise of the Thorns', image: '' },
};
