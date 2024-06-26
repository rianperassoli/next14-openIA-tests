const TourInfo = ({ tour }) => {
  const { title, description, stops } = tour;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
      <p className="mb-6 leading-loose">{description}</p>
      <ul>
        {stops.map((stop) => {
          return (
            <li key={stop} className="bg-base-100 rounded-xl p-4 mb-4">
              <p className="text">{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export { TourInfo };
