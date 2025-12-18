import { useParams } from "react-router-dom";
import { galleryEvents } from "../data/galleryData";

export default function EventImages() {
  const { id } = useParams();
  const event = galleryEvents.find((e) => e.id === id);

  if (!event) return <p>Event not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {event.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="h-64 w-full object-cover rounded-xl hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}
