interface LastAction {
  status: string;
  timestamp: number;
  relative: string;
}

interface Status {
  description: string;
  details: string;
  state: string;
  color: string;
  until: number;
}

export interface PlayerInformation {
  rank: string;
  level: number;
  gender: string;
  property: string;
  signup: string;
  awards: number;
  friends: number;
  enemies: number;
  forum_posts: number;
  karma: number;
  age: number;
  role: string;
  donator: 1;
  player_id: number;
  name: string;
  property_id: number;
  competition: null;
  revivable: number;
  life: {
    current: number;
    maximum: number;
    increment: number;
    interval: number;
    ticktime: number;
    fulltime: number;
  };
  status: Status;
  job: {
    position: string;
    company_id: number;
    company_name: string;
    company_type: number;
  };
  faction: {
    position: string;
    faction_id: number;
    days_in_faction: number;
    faction_name: string;
    faction_tag: string;
  };
  states: {
    hospital_timestamp: number;
    jail_timestamp: number;
  };
  last_action: LastAction;
}

export interface MemberInformation {
  member_id: string;
  name: string;
  position: string;
  days_in_faction: number;
  last_action: LastAction;
  status: Status;
  personalstats: Record<string, unknown>;
}

export interface EmployeeInformation {
  name: string;
  position: string;
  days_in_company: number;
  wage: number;
  manual_labor: number;
  intelligence: number;
  endurance: number;
  effectiveness: {
    working_stats: number;
    settled_in: number;
    director_education: number;
    addiction: number;
    total: number;
  };
  last_action: LastAction;
  status: Status;
}

export interface CompanyInformation {
  company_employees: {
    [key: string]: EmployeeInformation;
  };
}
