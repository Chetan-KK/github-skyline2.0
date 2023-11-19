import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Exprerience from "./Exprerience";

const SkylinePage = () => {
  const { username, year } = useParams();

  const [contributionCount, setContributionCount] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributions();
  }, []);

  async function getContributions() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = {
      query: `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `,
    };
    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      const data = await response.json();

      // Extracting contribution data
      const contributions =
        data.data.user.contributionsCollection.contributionCalendar.weeks;

      // Initialize an array to store collections of 7 values
      const weeklyContributions: Number[][] = [];

      contributions.forEach((week: any) => {
        const weekArray = [];
        week.contributionDays.forEach((day: any) => {
          weekArray.push(day.contributionCount / 2);
        });

        // Pad the array with zeros if there are less than 7 values
        while (weekArray.length < 7) {
          weekArray.push(0);
        }

        // Push the array of 7 values to the main array
        weeklyContributions.push(weekArray);
      });

      setContributionCount(weeklyContributions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  }

  return (
    <div>
      <div className="h-screen">
        {loading ? (
          <h2>loading...</h2>
        ) : (
          <>
            {/* <Leva collapsed /> */}
            <Canvas
              shadows
              camera={{
                fov: 45,
                near: 0.1,
                far: 500,
                position: [5, 5, 7],
              }}
            >
              <Exprerience
                contributionCount={contributionCount}
                username={username}
                year={year}
              />
            </Canvas>
          </>
        )}
      </div>
    </div>
  );
};

export default SkylinePage;
