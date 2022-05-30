CREATE TABLE IF NOT EXISTS val_account (
	puuid uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
	region text,
	account_level bigint,
	name text,
	tag text,
	card_id text,
	card_small text,
	card_large text,
	card_wide text,
	waypoint_uid text,
	waypoint_username text,
	last_update timestamp WITH time zone
);

CREATE TABLE IF NOT EXISTS val_match (
	matchid uuid PRIMARY KEY UNIQUE,
	map text,
	game_version text,
	game_length bigint,
	game_start bigint,
	game_start_patched text,
	rounds_played smallint,
	mode text,
	season_id uuid,
	platform text,
	region text,
	cluster text,
	team_red_has_won boolean,
	team_red_rounds_won smallint,
	team_red_rounds_lost smallint,
	team_blue_has_won boolean,
	team_blue_rounds_won smallint,
	team_blue_rounds_lost smallint
);

CREATE TABLE IF NOT EXISTS val_match_player (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
	puuid uuid NOT NULL REFERENCES val_account,
	matchid uuid NOT NULL REFERENCES val_match,
	name text,
	tag text,
	team text,
	level smallint,
	character text,
	currenttier smallint,
	currenttier_patched text,
	player_card uuid,
	player_title uuid,
	party_id uuid,
	session_playtime integer,
	assets_card_small text,
	assets_card_large text,
	assets_card_wide text,
	assets_agent_small text,
	assets_agent_full text,
	assets_agent_bust text,
	assets_agent_killfeed text,
	behaviour_afk_rounds smallint,
	behaviour_friendly_fire_incoming integer,
	behaviour_friendly_fire_outgoing integer,
	behaviour_rounds_in_spawn smallint,
	ability_casts_c smallint,
	ability_casts_q smallint,
	ability_casts_e smallint,
	ability_casts_x smallint,
	stats_score integer,
	stats_kills smallint,
	stats_deaths smallint,
	stats_assists smallint,
	stats_bodyshots smallint,
	stats_headshots smallint,
	stats_legshots smallint,
	stats_damage_made integer,
	stats_damage_received integer,
	economy_spent_overall integer,
	economy_spent_average integer,
	economy_loadout_overall integer,
	economy_loadout_average integer
);

CREATE TABLE IF NOT EXISTS val_match_round (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
	matchid uuid NOT NULL REFERENCES val_match,
	round_number smallint,
	winning_team text,
	end_type text,
	bomb_planted boolean,
	bomb_defused boolean,
	plant_loc_x integer,
	plant_loc_y integer,
	plant_by_puuid uuid,
	plant_by_display_name text,
	plant_by_team text,
	plant_site text,
	plant_time_in_round integer,
	defuse_loc_x integer,
	defuse_loc_y integer,
	defuse_by_puuid uuid,
	defuse_by_display_name text,
	defuse_by_team text,
	defuse_time_in_round integer
);


CREATE TABLE IF NOT EXISTS val_match_round_playerstats (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
	matchid uuid NOT NULL REFERENCES val_match,
	round_id uuid NOT NULL REFERENCES val_match_round,
	round_number smallint,
	ability_casts_c smallint,
	ability_casts_q smallint,
	ability_casts_e smallint,
	ability_casts_x smallint,
	player_puuid uuid NOT NULL REFERENCES val_match_player,
	player_display_name text,
	player_team text,
	damage integer,
	bodyshots smallint,
	headshots smallint,
	legshots smallint,
	kills smallint,
	score integer,
	economy_loadout_value integer,
	economy_remaining integer,
	economy_spent integer,
	weapon_id uuid,
	weapon_name text,
	weapon_display_icon text,
	weapon_killfeed_icon text,
	armor_id uuid,
	armor_name text,
	armor_display_icon text,
	was_afk boolean,
	was_penalized boolean,
	stayed_in_spawn boolean
);

alter table public.val_account
  enable row level security;
alter table public.val_match
  enable row level security;
alter table public.val_match_player
  enable row level security;
alter table public.val_match_round
  enable row level security;
alter table public.val_match_round_playerstats
  enable row level security;