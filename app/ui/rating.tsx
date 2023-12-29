type Props = {
  id?: number;
  defaultRating?: number;
  disabled?: boolean;
  className?: string;
};

export function Rating({ defaultRating, disabled, className, id }: Props) {
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
}
