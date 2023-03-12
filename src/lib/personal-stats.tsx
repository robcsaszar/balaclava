import type { PersonalStats } from "../common/types";

const specialStats: PersonalStats = {
  kda: {
    label: "KDA",
    category: "combat",
    type: "number",
  },
  costperrehab: {
    label: "Cost per rehab",
    category: "drugs",
    type: "money",
  },
  hitrate: {
    label: "Hit rate",
    category: "combat",
    type: "percentage",
  },
  factionhits: {
    label: "Organized hits",
    category: "faction",
    type: "number",
  },
  stealth: {
    label: "Stealth hits",
    category: "combat",
    type: "percentage",
  },
  damageperhit: {
    label: "Avg. damage per hit",
    category: "combat",
    type: "number",
  },
  bloodliters: {
    label: "Blood donated",
    category: "medical",
    type: "liquid",
  },
};

const personalStats: PersonalStats = {
  activestreak: {
    label: "Active streak",
    category: "activity",
    type: "number",
  },
  alcoholused: {
    label: "Alcohol used",
    category: "boosters",
    type: "number",
  },
  argtravel: {
    label: "Argentina travel",
    category: "travel",
    type: "number",
  },
  arrestsmade: {
    label: "Arrests made",
    category: "job",
    type: "number",
  },
  attackcriticalhits: {
    label: "Critical hits",
    category: "combat",
    type: "number",
  },
  attackdamage: {
    label: "Total damage",
    category: "combat",
    type: "number",
  },
  attackhits: {
    label: "Hits",
    category: "combat",
    type: "number",
  },
  attackmisses: {
    label: "Misses",
    category: "combat",
    type: "number",
  },
  attacksassisted: {
    label: "Assists",
    category: "combat",
    type: "number",
  },
  attacksdraw: {
    label: "Attacks stalemated",
    category: "combat",
    type: "number",
  },
  attackslost: {
    label: "Attacks lost",
    category: "combat",
    type: "number",
  },
  attacksstealthed: {
    label: "Stealthed",
    category: "combat",
    type: "number",
  },
  attackswon: {
    label: "Attacks won",
    category: "combat",
    type: "number",
  },
  attackswonabroad: {
    label: "Attacks won abroad",
    category: "weapons",
    type: "number",
  },
  auctionsells: {
    label: "Auctions held",
    category: "trading",
    type: "number",
  },
  auctionswon: {
    label: "Auctions won",
    category: "trading",
    type: "number",
  },
  awards: {
    label: "Awards",
    category: "activity",
    type: "number",
  },
  axehits: {
    label: "Clubbing hits",
    category: "weapons",
    type: "number",
  },
  bestactivestreak: {
    label: "Best streak",
    category: "activity",
    type: "number",
  },
  bestdamage: {
    label: "Best damage",
    category: "combat",
    type: "number",
  },
  bestkillstreak: {
    label: "Best kill streak",
    category: "combat",
    type: "number",
  },
  bloodwithdrawn: {
    label: "Blood withdrawn",
    category: "medical",
    type: "number",
  },
  booksread: {
    label: "Books read",
    category: "activity",
    type: "number",
  },
  boostersused: {
    label: "Boosters used",
    category: "boosters",
    type: "number",
  },
  bountiescollected: {
    label: "Bounties collected",
    category: "miscellaneous",
    type: "number",
  },
  bountiesplaced: {
    label: "Bounties placed",
    category: "miscellaneous",
    type: "number",
  },
  bountiesreceived: {
    label: "Bounties received",
    category: "miscellaneous",
    type: "number",
  },
  candyused: {
    label: "Candy used",
    category: "boosters",
    type: "number",
  },
  cantaken: {
    label: "Canabis taken",
    category: "drugs",
    type: "number",
  },
  cantravel: {
    label: "Canada travel",
    category: "travel",
    type: "number",
  },
  caytravel: {
    label: "Cayman travel",
    category: "travel",
    type: "number",
  },
  chahits: {
    label: "Mechanical hits",
    category: "weapons",
    type: "number",
  },
  chitravel: {
    label: "China travel",
    category: "travel",
    type: "number",
  },
  cityfinds: {
    label: "City finds",
    category: "activity",
    type: "number",
  },
  cityitemsbought: {
    label: "City items bought",
    category: "activity",
    type: "number",
  },
  classifiedadsplaced: {
    label: "Ads placed",
    category: "miscellaneous",
    type: "number",
  },
  companymailssent: {
    label: "Company mails sent",
    category: "activity",
    type: "number",
  },
  consumablesused: {
    label: "Consumables used",
    category: "boosters",
    type: "number",
  },
  contractscompleted: {
    label: "Contracts completed",
    category: "activity",
    type: "number",
  },
  daysbeendonator: {
    label: "Days been donator",
    category: "miscellaneous",
    type: "number",
  },
  defendslost: {
    label: "Defends lost",
    category: "combat",
    type: "number",
  },
  defendslostabroad: {
    label: "Defends lost abroad",
    category: "weapons",
    type: "number",
  },
  defendsstalemated: {
    label: "Defends stalemated",
    category: "combat",
    type: "number",
  },
  defendswon: {
    label: "Defends won",
    category: "combat",
    type: "number",
  },
  drugsused: {
    label: "Drugs used",
    category: "drugs",
    type: "number",
  },
  dubtravel: {
    label: "Dubai travel",
    category: "travel",
    type: "number",
  },
  dukecontractscompleted: {
    label: "Duke contracts completed",
    category: "activity",
    type: "number",
  },
  dumpfinds: {
    label: "Dump finds",
    category: "activity",
    type: "number",
  },
  dumpsearches: {
    label: "Dump searches",
    category: "activity",
    type: "number",
  },
  elo: {
    label: "Elo",
    category: "combat",
    type: "other",
  },
  energydrinkused: {
    label: "Energy drink used",
    category: "boosters",
    type: "number",
  },
  exttaken: {
    label: "Ecstasy taken",
    category: "drugs",
    type: "number",
  },
  factionmailssent: {
    label: "Faction mails sent",
    category: "activity",
    type: "number",
  },
  failedbusts: {
    label: "Failed busts",
    category: "crime",
    type: "number",
  },
  friendmailssent: {
    label: "Friend mails sent",
    category: "activity",
    type: "number",
  },
  grehits: {
    label: "Temporary hits",
    category: "weapons",
    type: "number",
  },
  h2hhits: {
    label: "Hand-to-hand hits",
    category: "combat",
    type: "number",
  },
  hawtravel: {
    label: "Hawai'i travel",
    category: "travel",
    type: "number",
  },
  heahits: {
    label: "Heavy artillery hits",
    category: "weapons",
    type: "number",
  },
  highestbeaten: {
    label: "Highest beaten",
    category: "combat",
    type: "number",
  },
  hollowammoused: {
    label: "Hollow ammo used",
    category: "weapons",
    type: "number",
  },
  hospital: {
    label: "Hospitalized",
    category: "medical",
    type: "number",
  },
  incendiaryammoused: {
    label: "Incendiary ammo used",
    category: "weapons",
    type: "number",
  },
  itemsbought: {
    label: "Items bought",
    category: "trading",
    type: "number",
  },
  itemsboughtabroad: {
    label: "Shopped abroad",
    category: "trading",
    type: "number",
  },
  itemsdumped: {
    label: "Items dumped",
    category: "activity",
    type: "number",
  },
  itemslooted: {
    label: "Items looted",
    category: "activity",
    type: "number",
  },
  itemssent: {
    label: "Items sent",
    category: "trading",
    type: "number",
  },
  jailed: {
    label: "Jailed",
    category: "crime",
    type: "number",
  },
  japtravel: {
    label: "Japan travel",
    category: "travel",
    type: "number",
  },
  jobpointsused: {
    label: "Job points used",
    category: "job",
    type: "number",
  },
  kettaken: {
    label: "Ketamine taken",
    category: "drugs",
    type: "number",
  },
  largestmug: {
    label: "Largest mug",
    category: "money",
    type: "money",
  },
  lontravel: {
    label: "London travel",
    category: "travel",
    type: "number",
  },
  lsdtaken: {
    label: "LSD taken",
    category: "drugs",
    type: "number",
  },
  machits: {
    label: "Machine gun hits",
    category: "weapons",
    type: "number",
  },
  mailssent: {
    label: "Mails sent",
    category: "activity",
    type: "number",
  },
  medicalitemsused: {
    label: "medical items used",
    category: "medical",
    type: "number",
  },
  meritsbought: {
    label: "Merits bought",
    category: "miscellaneous",
    type: "number",
  },
  mextravel: {
    label: "Mexico travel",
    category: "travel",
    type: "number",
  },
  missioncreditsearned: {
    label: "Mission credits earned",
    category: "activity",
    type: "number",
  },
  missionscompleted: {
    label: "Missions completed",
    category: "activity",
    type: "number",
  },
  moneymugged: {
    label: "Money mugged",
    category: "money",
    type: "money",
  },
  nerverefills: {
    label: "Nerve refills",
    category: "boosters",
    type: "number",
  },
  networth: {
    label: "Networth",
    category: "money",
    type: "money",
  },
  onehitkills: {
    label: "One hit kills",
    category: "combat",
    type: "number",
  },
  opitaken: {
    label: "Opium taken",
    category: "drugs",
    type: "number",
  },
  organisedcrimes: {
    label: "Organised crimes",
    category: "faction",
    type: "number",
  },
  overdosed: {
    label: "Overdosed",
    category: "drugs",
    type: "number",
  },
  pcptaken: {
    label: "PCP taken",
    category: "drugs",
    type: "number",
  },
  peoplebought: {
    label: "Bails",
    category: "crime",
    type: "number",
  },
  peopleboughtspent: {
    label: "Bail spend",
    category: "crime",
    type: "money",
  },
  peoplebusted: {
    label: "Busted",
    category: "crime",
    type: "number",
  },
  personalsplaced: {
    label: "Personals placed",
    category: "miscellaneous",
    type: "number",
  },
  piehits: {
    label: "Piercing hits",
    category: "weapons",
    type: "number",
  },
  piercingammoused: {
    label: "Piercing ammo used",
    category: "weapons",
    type: "number",
  },
  pishits: {
    label: "Pistol hits",
    category: "weapons",
    type: "number",
  },
  pointsbought: {
    label: "Points bought",
    category: "trading",
    type: "number",
  },
  racesentered: {
    label: "Races entered",
    category: "racing",
    type: "number",
  },
  raceswon: {
    label: "Races won",
    category: "racing",
    type: "number",
  },
  racingpointsearned: {
    label: "Racing points earned",
    category: "racing",
    type: "number",
  },
  racingskill: {
    label: "Racing skill",
    category: "racing",
    type: "number",
  },
  raidhits: {
    label: "Raid hits",
    category: "faction",
    type: "number",
  },
  rankedwarhits: {
    label: "Ranked war hits",
    category: "faction",
    type: "number",
  },
  rankedwarringwins: {
    label: "Ranked wars won",
    category: "faction",
    type: "number",
  },
  receivedbountyvalue: {
    label: "Received bounty value",
    category: "miscellaneous",
    type: "money",
  },
  refills: {
    label: "Refills",
    category: "faction",
    type: "number",
  },
  rehabcost: {
    label: "Rehab cost",
    category: "drugs",
    type: "money",
  },
  rehabs: {
    label: "Rehabs",
    category: "drugs",
    type: "number",
  },
  respectforfaction: {
    label: "Respect earned",
    category: "faction",
    type: "number",
  },
  retals: {
    label: "Retals",
    category: "faction",
    type: "number",
  },
  revives: {
    label: "Revives",
    category: "medical",
    type: "number",
  },
  reviveskill: {
    label: "Revive skill",
    category: "medical",
    type: "number",
  },
  revivesreceived: {
    label: "Revives received",
    category: "medical",
    type: "number",
  },
  rifhits: {
    label: "Rifle hits",
    category: "weapons",
    type: "number",
  },
  roundsfired: {
    label: "Rounds fired",
    category: "combat",
    type: "number",
  },
  shohits: {
    label: "Shotgun hits",
    category: "weapons",
    type: "number",
  },
  shrtaken: {
    label: "Shrooms taken",
    category: "drugs",
    type: "number",
  },
  slahits: {
    label: "Slashing hits",
    category: "weapons",
    type: "number",
  },
  smghits: {
    label: "SMG hits",
    category: "weapons",
    type: "number",
  },
  soutravel: {
    label: "South Africa travel",
    category: "travel",
    type: "number",
  },
  specialammoused: {
    label: "Special ammo used",
    category: "weapons",
    type: "number",
  },
  spetaken: {
    label: "Speed taken",
    category: "drugs",
    type: "number",
  },
  spousemailssent: {
    label: "Spouse mails sent",
    category: "activity",
    type: "number",
  },
  statenhancersused: {
    label: "Stat enhancers used",
    category: "boosters",
    type: "number",
  },
  switravel: {
    label: "Switzerland travel",
    category: "travel",
    type: "number",
  },
  territoryclears: {
    label: "Territory clears",
    category: "faction",
    type: "number",
  },
  territoryjoins: {
    label: "Territory joins",
    category: "faction",
    type: "number",
  },
  territorytime: {
    label: "Territory time",
    category: "faction",
    type: "time",
  },
  theyrunaway: {
    label: "Escapes",
    category: "combat",
    type: "number",
  },
  tokenrefills: {
    label: "Token refills",
    category: "activity",
    type: "number",
  },
  totalbountyreward: {
    label: "Bounty rewards",
    category: "miscellaneous",
    type: "money",
  },
  totalbountyspent: {
    label: "Bounty spend",
    category: "crime",
    type: "money",
  },
  tracerammoused: {
    label: "Tracer ammo used",
    category: "weapons",
    type: "number",
  },
  trainsreceived: {
    label: "Trains received",
    category: "job",
    type: "number",
  },
  traveltime: {
    label: "travel time",
    category: "travel",
    type: "time",
  },
  traveltimes: {
    label: "travel times",
    category: "travel",
    type: "number",
  },
  unarmoredwon: {
    label: "Unarmored won",
    category: "combat",
    type: "number",
  },
  useractivity: {
    label: "User activity",
    category: "activity",
    type: "time",
  },
  victaken: {
    label: "Vicodin taken",
    category: "drugs",
    type: "number",
  },
  virusescoded: {
    label: "Viruses coded",
    category: "crime",
    type: "number",
  },
  weaponsbought: {
    label: "Weapons bought",
    category: "trading",
    type: "number",
  },
  xantaken: {
    label: "Xanax taken",
    category: "drugs",
    type: "number",
  },
  yourunaway: {
    label: "Escaped",
    category: "combat",
    type: "number",
  },
};

// Export both the special and personal stats as a single object
export const personalStatistics = { ...specialStats, ...personalStats };
