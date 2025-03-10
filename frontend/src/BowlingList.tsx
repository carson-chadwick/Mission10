import { useEffect, useState } from "react";
import { bowler } from "./types/bowler";
import "./App.css"; // Import CSS file

function BowlingList() {
  const [bowlers, setBowlers] = useState<bowler[]>([]);

  useEffect(() => {
    const fetchBowler = async () => {
      const response = await fetch(
        "https://localhost:5000/BowlingTeam/bowlers"
      );
      const data = await response.json();
      setBowlers(data);
    };
    fetchBowler();
  }, []);

  const filteredBowlers = bowlers.filter(
    (b) => b.teamName === "Marlins" || b.teamName === "Sharks"
  );

  return (
    <>
      <h1>Bowlers</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Initial</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredBowlers.map((b) => (
            <tr key={b.bowlerId}>
              <td>{b.bowlerFirstName}</td>
              <td>{b.bowlerLastName}</td>
              <td>{b.bowlerMiddleInit}</td>
              <td>{b.bowlerAddress}</td>
              <td>{b.bowlerCity}</td>
              <td>{b.bowlerState}</td>
              <td>{b.bowlerZip}</td>
              <td>{b.bowlerPhoneNumber}</td>
              <td>{b.teamName ?? "No Team"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BowlingList;
