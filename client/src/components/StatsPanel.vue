<script setup>
import { useMatchHistoryStore } from '@/stores/matchHistoryStore';
import { usePlayerStore } from '@/stores/playerStore';
import { computed } from 'vue';
const matchHistory = useMatchHistoryStore();
const player = usePlayerStore();

const numGames = computed(()=>{
    return matchHistory.matches.length;
});
const sums = computed(()=>{
    if(!(matchHistory.matches.length>0)){
        return {}
    }
    else{
        if(!(matchHistory.matches[0].info.participants.find(p=>(p.puuid===player.puuid)))){
            return {}
        }
        const sumsObject = matchHistory.matches.reduce((prev, curr)=>{
            const currPlayer = curr.info.participants.find(p=>(p.puuid===player.puuid));
            return {
                wins: currPlayer.win ? 1 : 0 + prev.wins,
                kills: currPlayer.kills + prev.kills,
                deaths: currPlayer.deaths + prev.deaths,
                assists: currPlayer.assists + prev.assists,
                goldSpent: currPlayer.goldSpent + prev.goldSpent,
                totalHeal: currPlayer.totalHeal + prev.totalHeal,
                gameLength: currPlayer.challenges.gameLength + prev.gameLength,
                abilityUses: currPlayer.challenges.abilityUses + prev.abilityUses,
                soloKills: currPlayer.challenges.soloKills + prev.soloKills,
                bountyGold: currPlayer.challenges.bountyGold + prev.bountyGold,
                skillshotsHit: currPlayer.challenges.skillshotsHit + prev.skillshotsHit,
                goldPerMinute: currPlayer.challenges.goldPerMinute + prev.goldPerMinute,
                wardTakedowns: currPlayer.challenges.wardTakedowns + prev.wardTakedowns,
                baronTakedowns: currPlayer.challenges.baronTakedowns + prev.baronTakedowns,
                teamBaronKills: currPlayer.challenges.teamBaronKills + prev.teamBaronKills,
                damagePerMinute: currPlayer.challenges.damagePerMinute + prev.damagePerMinute,
                dragonTakedowns: currPlayer.challenges.dragonTakedowns + prev.dragonTakedowns,
                killParticipation: currPlayer.challenges.killParticipation + prev.killParticipation,
                turretPlatesTaken: currPlayer.challenges.turretPlatesTaken + prev.turretPlatesTaken,
                controlWardsPlaced: currPlayer.challenges.controlWardsPlaced + prev.controlWardsPlaced,
                stealthWardsPlaced: currPlayer.challenges.stealthWardsPlaced + prev.stealthWardsPlaced,
                riftHeraldTakedowns: currPlayer.challenges.riftHeraldTakedowns + prev.riftHeraldTakedowns,
                teamRiftHeraldKills: currPlayer.challenges.teamRiftHeraldKills + prev.teamRiftHeraldKills,
                teamDamagePercentage: currPlayer.challenges.teamDamagePercentage + prev.teamDamagePercentage,
                damageTakenOnTeamPercentage: currPlayer.challenges.damageTakenOnTeamPercentage + prev.damageTakenOnTeamPercentage,
                physicalDamageDealtToChampions: currPlayer.physicalDamageDealtToChampions + prev.physicalDamageDealtToChampions,
                magicDamageDealtToChampions: currPlayer.magicDamageDealtToChampions + prev.magicDamageDealtToChampions,
                trueDamageDealtToChampions: currPlayer.trueDamageDealtToChampions + prev.trueDamageDealtToChampions,
                damageDealtToTurrets: currPlayer.damageDealtToTurrets + prev.damageDealtToTurrets,
                damageDealtToBuildings: currPlayer.damageDealtToBuildings + prev.damageDealtToBuildings,
                damageDealtToObjectives: currPlayer.damageDealtToObjectives + prev.damageDealtToObjectives,
                turretTakedowns: currPlayer.turretTakedowns + prev.turretTakedowns,
                goldEarned: currPlayer.goldEarned + prev.goldEarned,
                timePlayed: currPlayer.timePlayed + prev.timePlayed,
                spell1Casts: currPlayer.spell1Casts + prev.spell1Casts,
                spell2Casts: currPlayer.spell2Casts + prev.spell2Casts,
                spell3Casts: currPlayer.spell3Casts + prev.spell3Casts,
                spell4Casts: currPlayer.spell4Casts + prev.spell4Casts,
                teamDragonKills: curr.info.teams.find(t=>(t.win===currPlayer.win)).objectives.dragon.kills + prev.teamDragonKills,
                visionScore: currPlayer.visionScore + prev.visionScore,
            }
        },  {
            // Default values for initial iteration.
                wins: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
                goldSpent: 0,
                totalHeal: 0,
                gameLength:0,
                abilityUses:0,
                soloKills:0,
                bountyGold:0,
                skillshotsHit:0,
                goldPerMinute:0,
                wardTakedowns:0,
                baronTakedowns:0,
                teamBaronKills:0,
                damagePerMinute:0,
                dragonTakedowns:0,
                killParticipation:0,
                turretPlatesTaken:0,
                controlWardsPlaced:0,
                stealthWardsPlaced:0,
                riftHeraldTakedowns:0,
                teamRiftHeraldKills:0,
                teamDamagePercentage:0,
                damageTakenOnTeamPercentage:0,
                physicalDamageDealtToChampions:0,
                magicDamageDealtToChampions:0,
                trueDamageDealtToChampions:0,
                damageDealtToTurrets:0,
                damageDealtToBuildings:0,
                damageDealtToObjectives:0,
                turretTakedowns:0,
                goldEarned:0,
                timePlayed:0,
                spell1Casts:0,
                spell2Casts:0,
                spell3Casts:0,
                spell4Casts:0,
                teamDragonKills:0,
                visionScore:0,
        }); 
        return sumsObject;
    }
})
</script>
<template>
    <div class="flex flex-col items-center mt-2 pt-2">
        <h1 class="text-white font-bold text-xl">{{ `Averages over the last ${numGames ? numGames : 0} games` }}</h1>
        <div class="flex flex-col">
            <h3 class="text-gray-500 text-lg pl-3 mt-2"> Player Stats </h3>
            <div class="stats stats-horizontal">
                <div class="stat">
                    <div class="stat-title text-xs">Kills</div>
                    <div class="stat-value text-3xl">{{ (sums.kills/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Deaths</div>
                    <div class="stat-value text-3xl">{{ (sums.deaths/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Assists</div>
                    <div class="stat-value text-3xl">{{ (sums.assists/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Kill Participation</div>
                    <div class="stat-value text-3xl">{{ ((sums.killParticipation/numGames)*100).toFixed(1) +"%" }}</div>
                </div>
            </div>
            <h3 class="text-gray-500 text-lg pl-3 mt-2"> Income </h3>
            <div class="stats stats-horizontal">
                <div class="stat">
                    <div class="stat-title text-xs">Gold Earned</div>
                    <div class="stat-value text-3xl">{{ (sums.goldEarned/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Gold Spent</div>
                    <div class="stat-value text-3xl">{{ (sums.goldSpent/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Gold/Min</div>
                    <div class="stat-value text-3xl">{{ (sums.goldEarned/(sums.timePlayed/60)).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Bounty Gold</div>
                    <div class="stat-value text-3xl">{{ (sums.bountyGold/numGames).toFixed(1) }}</div>
                </div>
            </div>
            <h3 class="text-gray-500 text-lg pl-3 mt-2"> Structures </h3>
            <div class="stats stats-horizontal">
                <div class="stat">
                    <div class="stat-title text-xs">Plates Taken</div>
                    <div class="stat-value text-3xl">{{ (sums.turretPlatesTaken/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Turret Takedowns</div>
                    <div class="stat-value text-3xl">{{ (sums.turretTakedowns/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">DMG to Turrets</div>
                    <div class="stat-value text-3xl">{{ (sums.damageDealtToTurrets/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">DMG to Objectives</div>
                    <div class="stat-value text-3xl">{{ (sums.damageDealtToObjectives/numGames).toFixed(1) }}</div>
                </div>
            </div>
            <h3 class="text-gray-500 text-lg pl-3 mt-2"> Neutral Objectives </h3>
            <div class="stats stats-horizontal">
                <div class="stat">
                    <div class="stat-title text-xs">Dragon Takedowns </div>
                    <div class="stat-value text-3xl">{{ (sums.dragonTakedowns/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Team Dragon Kills</div>
                    <div class="stat-value text-3xl">{{ (sums.teamDragonKills/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Baron Takedowns </div>
                    <div class="stat-value text-3xl">{{ (sums.baronTakedowns/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Team Baron Kills </div>
                    <div class="stat-value text-3xl">{{ (sums.teamBaronKills/numGames).toFixed(1) }}</div>
                </div>
            </div>
            <h3 class="text-gray-500 text-lg pl-3 mt-2"> Vision Score </h3>
            <div class="stats stats-horizontal">
                <div class="stat">
                    <div class="stat-title text-xs">Vision Score </div>
                    <div class="stat-value text-3xl">{{ (sums.visionScore/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Stealth Wards Placed </div>
                    <div class="stat-value text-3xl">{{ (sums.stealthWardsPlaced/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Control Wards Placed </div>
                    <div class="stat-value text-3xl">{{ (sums.controlWardsPlaced/numGames).toFixed(1) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title text-xs">Wards Destroyed </div>
                    <div class="stat-value text-3xl">{{ (sums.wardTakedowns/numGames).toFixed(1) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>