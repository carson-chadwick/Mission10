using Microsoft.AspNetCore.Mvc;
using Mission10.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission10.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BowlingTeamController : ControllerBase
    {
        private readonly BowlingLeagueContext _bowlingContext;

        public BowlingTeamController(BowlingLeagueContext temp)
        {
            _bowlingContext = temp;
        }

        // Fetch all bowlers with their associated team names
        [HttpGet("bowlers")]
        public IActionResult GetBowlersWithTeams()
        {
            var bowlersWithTeams = _bowlingContext.Bowlers
                .Join(_bowlingContext.Teams,
                      bowler => bowler.TeamId,
                      team => team.TeamId,
                      (bowler, team) => new
                      {
                          bowler.BowlerId,
                          bowler.BowlerFirstName,
                          bowler.BowlerLastName,
                          bowler.BowlerMiddleInit,
                          bowler.BowlerAddress,
                          bowler.BowlerCity,
                          bowler.BowlerState,
                          bowler.BowlerZip,
                          bowler.BowlerPhoneNumber,
                          bowler.TeamId,
                          TeamName = team.TeamName  // Get team name from the Teams table
                      })
                .ToList();

            return Ok(bowlersWithTeams);
        }

        // Fetch all teams
        [HttpGet("teams")]
        public IEnumerable<Team> GetTeams()
        {
            return _bowlingContext.Teams.ToList();
        }
    }
}

