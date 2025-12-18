
import { galleryEvents } from "../data/galleryData";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">College Gallery</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {galleryEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/gallery/${event.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition"
          >
            <img
              src={event.cover}
              alt={event.title}
              className="h-56 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
