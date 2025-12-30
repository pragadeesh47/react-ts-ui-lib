
//@@viewOn:imports
import { useEffect, useState } from "react";
//@@viewOff:imports

//@@viewOn:constants
const owner = 'karel-cz';
const repo = 'react-ts-ui-lib';
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}
//@@viewOff:helpers

//@@viewOn:propTypes
//@@viewOff:propTypes


function Contributions() {
    //@@viewOn:private
    const [contributors, setContributions] = useState<Contributor[]>([]);

    async function fetchContributors() {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const contributors = await res.json();

        const result: Contributor[] = contributors.map((c: any) => ({
            id: c.id,
            login: c.login,
            html_url: c.html_url,
            avatar_url: c.avatar_url,
            contributions: c.contributions,
        }));

        setContributions(result);
    }

    useEffect(() => {
        fetchContributors();

    }, []);

//@@viewOff:private


    //@@viewOn:render
    return (
      <div>
        <h3>Contributors</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Avatar</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Login</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: "8px" }}>Contributions</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c) => (
              <tr key={c.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  <img src={c.avatar_url} alt={c.login} width={32} height={32} style={{ borderRadius: 4 }} />
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  <a href={c.html_url} target="_blank" rel="noreferrer">{c.login}</a>
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee", textAlign: "right" }}>{c.contributions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
//@@viewOff:render

}




//@@viewOn:exports
export { Contributions };
export default Contributions;
//@@viewOff:exports
