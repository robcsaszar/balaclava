import type { PersonalStats } from "../common/types";

export const personalStatistics: PersonalStats = {
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
  useractivity: {
    label: "User activity",
    category: "activity",
    type: "time",
  },
  activestreak: {
    label: "Active streak",
    category: "activity",
    type: "number",
  },
  bestactivestreak: {
    label: "Best streak",
    category: "activity",
    type: "number",
  },
  itemsbought: {
    label: "Items bought",
    category: "trading",
    type: "number",
  },
  pointsbought: {
    label: "Points bought",
    category: "trading",
    type: "number",
  },
  itemsboughtabroad: {
    label: "Shopped abroad",
    category: "trading",
    type: "number",
  },
  weaponsbought: {
    label: "Weapons bought",
    category: "trading",
    type: "number",
  },
  itemssent: {
    label: "Items sent",
    category: "trading",
    type: "number",
  },
  auctionswon: {
    label: "Auctions won",
    category: "trading",
    type: "number",
  },
  auctionsells: {
    label: "Auctions held",
    category: "trading",
    type: "number",
  },
  attackswon: {
    label: "Won",
    category: "combat",
    type: "number",
  },
  attackslost: {
    label: "Lost",
    category: "combat",
    type: "number",
  },
  attacksdraw: {
    label: "Stalemates",
    category: "combat",
    type: "number",
  },
  bestkillstreak: {
    label: "Best kill streak",
    category: "combat",
    type: "number",
  },
  moneymugged: {
    label: "Money mugged",
    category: "money",
    type: "money",
  },
  attacksstealthed: {
    label: "Stealthed",
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
  attackdamage: {
    label: "Total damage",
    category: "combat",
    type: "number",
  },
  attackcriticalhits: {
    label: "Critical hits",
    category: "combat",
    type: "number",
  },
  respectforfaction: {
    label: "Respect earned",
    category: "faction",
    type: "number",
  },
  onehitkills: {
    label: "One hit kills",
    category: "combat",
    type: "number",
  },
  defendswon: {
    label: "Defends won",
    category: "combat",
    type: "number",
  },
  defendslost: {
    label: "Defends lost",
    category: "combat",
    type: "number",
  },
  defendsstalemated: {
    label: "Defends stalemated",
    category: "combat",
    type: "number",
  },
  bestdamage: {
    label: "Best damage",
    category: "combat",
    type: "number",
  },
  roundsfired: {
    label: "Rounds fired",
    category: "combat",
    type: "number",
  },
  yourunaway: {
    label: "Escaped",
    category: "combat",
    type: "number",
  },
  theyrunaway: {
    label: "Escapes",
    category: "combat",
    type: "number",
  },
  highestbeaten: {
    label: "Highest beaten",
    category: "combat",
    type: "number",
  },
  peoplebusted: {
    label: "Busted",
    category: "crime",
    type: "number",
  },
  failedbusts: {
    label: "Failed busts",
    category: "crime",
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
  virusescoded: {
    label: "Viruses coded",
    category: "crime",
    type: "number",
  },
  cityfinds: {
    label: "City finds",
    category: "activity",
    type: "number",
  },
  traveltimes: {
    label: "Travel times",
    category: "travel",
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
  bountiescollected: {
    label: "Bounties collected",
    category: "miscellaneous",
    type: "number",
  },
  totalbountyreward: {
    label: "Bounty rewards",
    category: "miscellaneous",
    type: "money",
  },
  revives: {
    label: "Revives",
    category: "medical",
    type: "number",
  },
  revivesreceived: {
    label: "Revives received",
    category: "medical",
    type: "number",
  },
  medicalitemsused: {
    label: "Medical items used",
    category: "medical",
    type: "number",
  },
  statenhancersused: {
    label: "Stat enhancers used",
    category: "boosters",
    type: "number",
  },
  trainsreceived: {
    label: "Trains received",
    category: "job",
    type: "number",
  },
  totalbountyspent: {
    label: "Bounty spend",
    category: "crime",
    type: "money",
  },
  drugsused: {
    label: "Drugs used",
    category: "drugs",
    type: "number",
  },
  overdosed: {
    label: "Overdosed",
    category: "drugs",
    type: "number",
  },
  meritsbought: {
    label: "Merits bought",
    category: "miscellaneous",
    type: "number",
  },
  personalsplaced: {
    label: "Personals placed",
    category: "miscellaneous",
    type: "number",
  },
  classifiedadsplaced: {
    label: "Ads placed",
    category: "miscellaneous",
    type: "number",
  },
  mailssent: {
    label: "Mails sent",
    category: "activity",
    type: "number",
  },
  friendmailssent: {
    label: "Friend mails sent",
    category: "activity",
    type: "number",
  },
  factionmailssent: {
    label: "Faction mails sent",
    category: "activity",
    type: "number",
  },
  companymailssent: {
    label: "Company mails sent",
    category: "activity",
    type: "number",
  },
  spousemailssent: {
    label: "Spouse mails sent",
    category: "activity",
    type: "number",
  },
  largestmug: {
    label: "Largest mug",
    category: "money",
    type: "money",
  },
  cantaken: {
    label: "Canabis taken",
    category: "drugs",
    type: "number",
  },
  exttaken: {
    label: "Ecstasy taken",
    category: "drugs",
    type: "number",
  },
  kettaken: {
    label: "Ketamine taken",
    category: "drugs",
    type: "number",
  },
  lsdtaken: {
    label: "LSD taken",
    category: "drugs",
    type: "number",
  },
  opitaken: {
    label: "Opium taken",
    category: "drugs",
    type: "number",
  },
  shrtaken: {
    label: "Shrooms taken",
    category: "drugs",
    type: "number",
  },
  spetaken: {
    label: "Speed taken",
    category: "drugs",
    type: "number",
  },
  pcptaken: {
    label: "PCP taken",
    category: "drugs",
    type: "number",
  },
  xantaken: {
    label: "Xanax taken",
    category: "drugs",
    type: "number",
  },
  victaken: {
    label: "Vicodin taken",
    category: "drugs",
    type: "number",
  },
  chahits: {
    label: "Mechanical hits",
    category: "weapons",
    type: "number",
  },
  heahits: {
    label: "Heavy artillery hits",
    category: "weapons",
    type: "number",
  },
  axehits: {
    label: "Clubbing hits",
    category: "weapons",
    type: "number",
  },
  grehits: {
    label: "Temporary hits",
    category: "weapons",
    type: "number",
  },
  machits: {
    label: "Machine gun hits",
    category: "weapons",
    type: "number",
  },
  pishits: {
    label: "Pistol hits",
    category: "weapons",
    type: "number",
  },
  rifhits: {
    label: "Rifle hits",
    category: "weapons",
    type: "number",
  },
  shohits: {
    label: "Shotgun hits",
    category: "weapons",
    type: "number",
  },
  smghits: {
    label: "SMG hits",
    category: "weapons",
    type: "number",
  },
  piehits: {
    label: "Piercing hits",
    category: "weapons",
    type: "number",
  },
  slahits: {
    label: "Slashing hits",
    category: "weapons",
    type: "number",
  },
  argtravel: {
    label: "Argentina travel",
    category: "travel",
    type: "number",
  },
  mextravel: {
    label: "Mexico travel",
    category: "travel",
    type: "number",
  },
  dubtravel: {
    label: "Dubai travel",
    category: "travel",
    type: "number",
  },
  japtravel: {
    label: "Japan travel",
    category: "travel",
    type: "number",
  },
  lontravel: {
    label: "London travel",
    category: "travel",
    type: "number",
  },
  soutravel: {
    label: "South Africa travel",
    category: "travel",
    type: "number",
  },
  switravel: {
    label: "Switzerland travel",
    category: "travel",
    type: "number",
  },
  chitravel: {
    label: "China travel",
    category: "travel",
    type: "number",
  },
  cantravel: {
    label: "Canada travel",
    category: "travel",
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
  itemsdumped: {
    label: "Items dumped",
    category: "activity",
    type: "number",
  },
  daysbeendonator: {
    label: "Days been donator",
    category: "miscellaneous",
    type: "number",
  },
  caytravel: {
    label: "Cayman travel",
    category: "travel",
    type: "number",
  },
  jailed: {
    label: "Jailed",
    category: "crime",
    type: "number",
  },
  hospital: {
    label: "Hospitalized",
    category: "medical",
    type: "number",
  },
  attacksassisted: {
    label: "Assists",
    category: "combat",
    type: "number",
  },
  bloodwithdrawn: {
    label: "Blood withdrawn",
    category: "medical",
    type: "number",
  },
  networth: {
    label: "Networth",
    category: "money",
    type: "money",
  },
  missionscompleted: {
    label: "Missions completed",
    category: "activity",
    type: "number",
  },
  contractscompleted: {
    label: "Contracts completed",
    category: "activity",
    type: "number",
  },
  dukecontractscompleted: {
    label: "Duke contracts completed",
    category: "activity",
    type: "number",
  },
  missioncreditsearned: {
    label: "Mission credits earned",
    category: "activity",
    type: "number",
  },
  consumablesused: {
    label: "Consumables used",
    category: "boosters",
    type: "number",
  },
  candyused: {
    label: "Candy used",
    category: "boosters",
    type: "number",
  },
  alcoholused: {
    label: "Alcohol used",
    category: "boosters",
    type: "number",
  },
  energydrinkused: {
    label: "Energy drink used",
    category: "boosters",
    type: "number",
  },
  nerverefills: {
    label: "Nerve refills",
    category: "boosters",
    type: "number",
  },
  unarmoredwon: {
    label: "Unarmored won",
    category: "combat",
    type: "number",
  },
  h2hhits: {
    label: "Hand-to-hand hits",
    category: "combat",
    type: "number",
  },
  organisedcrimes: {
    label: "Organised crimes",
    category: "faction",
    type: "number",
  },
  territorytime: {
    label: "Territory time",
    category: "faction",
    type: "time",
  },
  territoryjoins: {
    label: "Territory joins",
    category: "faction",
    type: "number",
  },
  arrestsmade: {
    label: "Arrests made",
    category: "job",
    type: "number",
  },
  tokenrefills: {
    label: "Token refills",
    category: "activity",
    type: "number",
  },
  booksread: {
    label: "Books read",
    category: "activity",
    type: "number",
  },
  traveltime: {
    label: "Travel time",
    category: "travel",
    type: "time",
  },
  boostersused: {
    label: "Boosters used",
    category: "boosters",
    type: "number",
  },
  rehabs: {
    label: "Rehabs",
    category: "drugs",
    type: "number",
  },
  rehabcost: {
    label: "Rehab cost",
    category: "drugs",
    type: "money",
  },
  awards: {
    label: "Awards",
    category: "activity",
    type: "number",
  },
  receivedbountyvalue: {
    label: "Received bounty value",
    category: "miscellaneous",
    type: "money",
  },
  racingskill: {
    label: "Racing skill",
    category: "racing",
    type: "number",
  },
  raceswon: {
    label: "Races won",
    category: "racing",
    type: "number",
  },
  racesentered: {
    label: "Races entered",
    category: "racing",
    type: "number",
  },
  racingpointsearned: {
    label: "Racing points earned",
    category: "racing",
    type: "number",
  },
  specialammoused: {
    label: "Special ammo used",
    category: "weapons",
    type: "number",
  },
  cityitemsbought: {
    label: "City items bought",
    category: "activity",
    type: "number",
  },
  hollowammoused: {
    label: "Hollow ammo used",
    category: "weapons",
    type: "number",
  },
  tracerammoused: {
    label: "Tracer ammo used",
    category: "weapons",
    type: "number",
  },
  piercingammoused: {
    label: "Piercing ammo used",
    category: "weapons",
    type: "number",
  },
  incendiaryammoused: {
    label: "Incendiary ammo used",
    category: "weapons",
    type: "number",
  },
  attackswonabroad: {
    label: "Attacks won abroad",
    category: "weapons",
    type: "number",
  },
  defendslostabroad: {
    label: "Defends lost abroad",
    category: "weapons",
    type: "number",
  },
  rankedwarringwins: {
    label: "Ranked wars won",
    category: "faction",
    type: "number",
  },
  retals: {
    label: "Retals",
    category: "faction",
    type: "number",
  },
  elo: {
    label: "Elo",
    category: "combat",
    type: "other",
  },
  jobpointsused: {
    label: "Job points used",
    category: "job",
    type: "number",
  },
  reviveskill: {
    label: "Revive skill",
    category: "medical",
    type: "number",
  },
  itemslooted: {
    label: "Items looted",
    category: "activity",
    type: "number",
  },
  rankedwarhits: {
    label: "Ranked war hits",
    category: "faction",
    type: "number",
  },
  raidhits: {
    label: "Raid hits",
    category: "faction",
    type: "number",
  },
  territoryclears: {
    label: "Territory clears",
    category: "faction",
    type: "number",
  },
  refills: {
    label: "Refills",
    category: "faction",
    type: "number",
  },
};
