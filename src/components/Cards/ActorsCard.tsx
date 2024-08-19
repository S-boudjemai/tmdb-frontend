import React from "react";
import { Actor } from "../../types";

function ActorsCard({ actor }: { actor: Actor }) {
  const image = require("../../assets/image.jpg").default;
  return (
    <div>
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : image
        }
        alt={actor.name}
        className="w-full h-auto mb-2 rounded-lg"
      />

      <h3 className="text-lg font-bold">{actor.name}</h3>
      <p className="text-sm text-gray-400">{actor.character}</p>
    </div>
  );
}
export default ActorsCard;
