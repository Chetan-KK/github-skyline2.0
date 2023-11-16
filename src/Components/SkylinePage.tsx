import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Exprerience from "./Exprerience";
import { Leva } from "leva";

const SkylinePage = () => {
  const { username } = useParams();

  const [contributionCount, setContributionCount] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributions();
  }, []);

  async function getContributions() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const year = 2023;
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
          weekArray.push(day.contributionCount);
        });

        // Pad the array with zeros if there are less than 7 values
        while (weekArray.length < 7) {
          weekArray.push(0);
        }

        // Push the array of 7 values to the main array
        weeklyContributions.push(weekArray);
      });

      // Log the result
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
            <Leva collapsed />
            <Canvas
              shadows
              camera={{
                near: 0.1,
                far: 100,
              }}
            >
              <Exprerience
                contributionCount={contributionCount}
                username={username}
              />
            </Canvas>
          </>
        )}
      </div>
    </div>
  );
};

export default SkylinePage;