// "use client";

import { useState } from "react";

export function Rating({
  defaultRating,
  disabled,
  className,
  id,
}: {
  id?: number;
  defaultRating?: number;
  disabled?: boolean;
  className?: string;
}) {
  // const [checks, setChecks] = useState([]);

  console.log({ defaultRating });

  return (
    <div className={`rating ${className}`}>
      {new Array(5).fill(0).map((_, i) => (
        <input
          {...(defaultRating && { defaultChecked: i + 1 <= defaultRating })}
          key={i}
          type="radio"
          {...(id !== undefined
            ? { name: `rating-${id}` }
            : { name: `rating` })}
          value={i + 1}
          disabled={disabled}
          className={`mask mask-star-2 bg-amber-400 disabled:pointer-events-none `}
        />
      ))}
    </div>
  );

  return (
    <div className="rating">
      <input
        type="radio"
        name="rating"
        value={1}
        className="mask mask-star-2 bg-green-500"
      />
      <input
        type="radio"
        name="rating"
        value={2}
        className="mask mask-star-2 bg-green-500"
      />
      <input
        type="radio"
        name="rating"
        className="mask mask-star-2 bg-green-500"
        value={3}
      />
      <input
        type="radio"
        name="rating"
        value={4}
        className="mask mask-star-2 bg-green-500"
      />
      <input
        type="radio"
        name="rating"
        value={5}
        className="mask mask-star-2 bg-green-500"
      />
    </div>
  );
}
